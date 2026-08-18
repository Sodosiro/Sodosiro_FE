import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React, {
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import CustomText from "../common/CustomText";

const ITEM_HEIGHT = 68;
const VISIBLE_COUNT = 3;
const CENTER_INDEX = Math.floor(VISIBLE_COUNT / 2);
const LOOPS = 5;
const REPEAT_COUNT = LOOPS + 2;
const PADDING_HORIZONTAL = 52;

export interface RoulettePickerHandle {
  start: (targetIndex: number) => Promise<void>;
}

interface Props {
  isRolling: boolean;
  setIsRolling: Dispatch<SetStateAction<boolean>>;
  items: SodosiType[];
  onFinish?: (result: SodosiType) => void;
}

const shuffle = (arr: SodosiType[]) => {
  const copy = [...arr];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

interface RouletteItemProps {
  item: SodosiType;
  index: number;
  highlightIndex: SharedValue<number>;
  scale: SharedValue<number>;
}

const RouletteItem = React.memo(function RouletteItem({
  item,
  index,
  highlightIndex,
  scale,
}: RouletteItemProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: highlightIndex.value === index ? scale.value : 1 }],
  }));

  return (
    <View
      style={{
        height: ITEM_HEIGHT,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View style={[animatedStyle]}>
        <CustomText font="display">{item.name}</CustomText>
      </Animated.View>
    </View>
  );
});

export default forwardRef<RoulettePickerHandle, Props>(
  ({ isRolling, setIsRolling, items, onFinish }, ref) => {
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);
    const highlightIndex = useSharedValue(-1);

    const [displayItems, setDisplayItems] = useState(() => shuffle(items));

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
    }));

    const repeatedItems = useMemo(
      () => Array(REPEAT_COUNT).fill(displayItems).flat(),
      [displayItems],
    );

    const isFirstRender = useRef(true);

    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      translateY.value = 0;
    }, [displayItems]);

    const roll = (targetIndex: number) => {
      return new Promise<void>((resolve) => {
        if (isRolling) {
          resolve();
          return;
        }

        setIsRolling(true);
        highlightIndex.value = -1;

        const displayTargetIndex = displayItems.findIndex(
          (item) => item.name === items[targetIndex].name,
        );

        const topRow =
          LOOPS * displayItems.length + displayTargetIndex - CENTER_INDEX;
        const finalOffset = -(topRow * ITEM_HEIGHT);
        const centerRepeatedIndex = topRow + CENTER_INDEX;

        const DELAY = 300;
        const DURATION = 3000;

        translateY.value = withDelay(
          DELAY,
          withTiming(finalOffset, {
            duration: DURATION,
            easing: Easing.inOut(Easing.cubic),
          }),
        );

        setTimeout(() => {
          const centerItem = repeatedItems[centerRepeatedIndex];

          highlightIndex.value = centerRepeatedIndex;

          scale.value = 1;
          scale.value = withSequence(
            withTiming(1.05, { duration: 150 }),
            withTiming(1, { duration: 150 }, (finished) => {
              if (!finished) return;
              const firstIndex = displayItems.findIndex(
                (item) => item.name === centerItem.name,
              );
              const resetIndex = displayItems.length + firstIndex;
              const resetTopRow = resetIndex - CENTER_INDEX;
              translateY.value = -(resetTopRow * ITEM_HEIGHT);
            }),
          );

          setIsRolling(false);
          onFinish?.(centerItem);
          resolve();
        }, DELAY + DURATION);
      });
    };

    useImperativeHandle(ref, () => ({
      start: roll,
    }));

    return (
      <View className={`w-full flex-1 justify-center`}>
        <View
          style={{
            width: "100%",
            paddingHorizontal: PADDING_HORIZONTAL,
            height: ITEM_HEIGHT * VISIBLE_COUNT,
          }}
        >
          <MaskedView
            style={{ flex: 1 }}
            maskElement={
              <LinearGradient
                colors={["transparent", "white", "white", "transparent"]}
                locations={[0, 0.35, 0.65, 1]}
                style={{ flex: 1 }}
              />
            }
          >
            <Animated.View style={animatedStyle}>
              {repeatedItems.map((item, index) => (
                <RouletteItem
                  key={`${item}-${index}`}
                  item={item}
                  index={index}
                  highlightIndex={highlightIndex}
                  scale={scale}
                />
              ))}
            </Animated.View>
          </MaskedView>
          <PickerIndicator scale={scale} />
        </View>
      </View>
    );
  },
);

const PickerIndicator = ({ scale }: { scale: SharedValue<number> }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: "absolute",
          top: CENTER_INDEX * ITEM_HEIGHT,
          left: PADDING_HORIZONTAL,
          right: PADDING_HORIZONTAL,
          height: ITEM_HEIGHT,
          borderWidth: 4,
          borderColor: "white",
          borderRadius: 12,
        },
        animatedStyle,
      ]}
    />
  );
};
