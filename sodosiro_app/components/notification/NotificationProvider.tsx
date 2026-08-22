import { createContext, useContext, useRef, useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import NotificationItem from "../home/notification/NotificationItem";

type NotificationData = {
  title?: string;
  body?: string;
  type?: NoticeType;
  onPress?: () => void;
};

type NotificationContextType = {
  showNotification: (notification: NotificationData) => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

const HIDE_DISTANCE = 100;
const TAP_DISTANCE = 10;

const HIDDEN_POSITION = -80;
const AUTO_HIDE_DELAY = 3000;
const ANIMATION_DURATION = 300;

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notification, setNotification] = useState<NotificationData | null>(
    null,
  );

  const translateY = useSharedValue(HIDDEN_POSITION);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(0);

  const startX = useSharedValue(0);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hideNotification = () => {
    setNotification(null);
  };

  const clearAutoHideTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const startAutoHideTimer = () => {
    clearAutoHideTimer();

    timeoutRef.current = setTimeout(() => {
      translateY.value = withTiming(
        HIDDEN_POSITION,
        {
          duration: ANIMATION_DURATION,
        },
        (finished) => {
          if (finished) {
            scheduleOnRN(hideNotification);
          }
        },
      );

      opacity.value = withTiming(0, {
        duration: ANIMATION_DURATION,
      });
    }, AUTO_HIDE_DELAY);
  };

  const removeNotification = () => {
    clearAutoHideTimer();

    translateX.value = withTiming(0, {
      duration: 150,
    });

    translateY.value = withTiming(
      HIDDEN_POSITION,
      {
        duration: ANIMATION_DURATION,
      },
      (finished) => {
        if (finished) {
          scheduleOnRN(hideNotification);
        }
      },
    );

    opacity.value = withTiming(0, {
      duration: ANIMATION_DURATION,
    });
  };

  const handlePress = () => {
    if (notification?.onPress) notification?.onPress();
    removeNotification();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
      {
        translateY: translateY.value,
      },
    ],
    opacity: opacity.value,
  }));

  const tapGesture = Gesture.Tap()
    .maxDistance(TAP_DISTANCE)
    .onEnd(() => {
      translateX.value = withTiming(0, {
        duration: 100,
      });

      opacity.value = withTiming(1, {
        duration: 100,
      });

      scheduleOnRN(handlePress);
    });

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])

    .onBegin(() => {
      startX.value = translateX.value;

      scheduleOnRN(clearAutoHideTimer);
    })

    .onUpdate((event) => {
      const nextX = startX.value + event.translationX;

      translateX.value = nextX;

      const progress = Math.min(1, Math.abs(translateX.value) / HIDE_DISTANCE);

      opacity.value = 1 - progress * 0.5;
    })

    .onEnd(() => {
      if (translateX.value < -HIDE_DISTANCE) {
        translateX.value = withTiming(
          -500,
          {
            duration: 250,
          },
          (finished) => {
            if (finished) {
              scheduleOnRN(hideNotification);
            }
          },
        );

        opacity.value = withTiming(0, {
          duration: 250,
        });

        return;
      }

      if (translateX.value > HIDE_DISTANCE) {
        translateX.value = withTiming(
          500,
          {
            duration: 250,
          },
          (finished) => {
            if (finished) {
              scheduleOnRN(hideNotification);
            }
          },
        );

        opacity.value = withTiming(0, {
          duration: 250,
        });

        return;
      }

      translateX.value = withTiming(0, {
        duration: 200,
      });

      opacity.value = withTiming(1, {
        duration: 200,
      });

      scheduleOnRN(startAutoHideTimer);
    });

  const composedGesture = Gesture.Race(tapGesture, panGesture);

  const showNotification = (newNotification: NotificationData) => {
    clearAutoHideTimer();

    setNotification(newNotification);

    translateX.value = 0;
    translateY.value = HIDDEN_POSITION;
    opacity.value = 0;

    translateY.value = withTiming(0, {
      duration: ANIMATION_DURATION,
    });

    opacity.value = withTiming(1, {
      duration: ANIMATION_DURATION,
    });

    startAutoHideTimer();
  };

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
      }}
    >
      {children}

      {notification && (
        <GestureDetector gesture={composedGesture}>
          <Animated.View
            className="absolute top-14 left-5 right-5 rounded-full shadow-sm bg-white border border-border"
            style={animatedStyle}
          >
            <NotificationItem
              notification={{
                id: 0,
                type: notification.type as NoticeType,
                title: notification.title ?? "",
                body: notification.body,
                payload: undefined,
                isRead: false,
                createdAt: undefined,
              }}
              isFloating
            />
          </Animated.View>
        </GestureDetector>
      )}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification must be used inside NotificationProvider");
  }

  return context;
}
