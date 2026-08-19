import DayBadge from "@/components/trip/badge/DayBadge";
import EditToggleBadge from "@/components/trip/badge/EditToggleBadge";
import { LinearGradient } from "expo-linear-gradient";
import { Dispatch, memo, SetStateAction, useCallback, useEffect, useRef } from "react";
import { LayoutChangeEvent, View } from "react-native";
import DraggableFlatList, {
  OpacityDecorator,
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { ScrollView } from "react-native-gesture-handler";

type TimelineDayBadgeSectionProps = {
  badgeOrder: number[];
  isEditing?: boolean;
  setIsEditing?: Dispatch<SetStateAction<boolean>>;
  showEditButton: boolean;
  className?: string;
  setPlan?: Dispatch<SetStateAction<DayPlan[]>>;
  handleConfirmOpen?: () => void;
  onPressDayBadge?: (index: number) => void;
  onLayoutDayBadge?: (index: number, e: LayoutChangeEvent) => void;
  onBadgeContainerLayout?: (e: LayoutChangeEvent) => void;
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  paddingHorizontal?: number;
  badgeScrollRef?: React.RefObject<ScrollView | null>;
};

function TimelineDayBadgeSection({
  badgeOrder,
  isEditing = false,
  setIsEditing,
  showEditButton,
  className,
  setPlan,
  handleConfirmOpen,
  onPressDayBadge,
  onLayoutDayBadge,
  onBadgeContainerLayout,
  activeIndex,
  setActiveIndex,
  paddingHorizontal = 20,
  badgeScrollRef,
}: TimelineDayBadgeSectionProps) {
  const localScrollRef = useRef<ScrollView>(null);
  const dragListRef = useRef<any>(null);

  const targetScrollRef = badgeScrollRef || localScrollRef;

  // isEditing 전환 시 -> 배지 스크롤을 가장 왼쪽으로 리셋
  useEffect(() => {
    if (isEditing) {
      dragListRef.current?.scrollToOffset?.({ offset: 0, animated: false });
    } else {
      targetScrollRef.current?.scrollTo({ x: 0, animated: false });
    }
  }, [isEditing, targetScrollRef]);

  const handleBadgePress = useCallback(
    (index: number) => {
      setActiveIndex(index);
      onPressDayBadge?.(index);
    },
    [setActiveIndex, onPressDayBadge],
  );

  const handleBadgeDelete = useCallback(
    (dayId: number) => {
      if (!setPlan) return;
      setPlan((prev) => {
        const next = prev.filter((day) => day.id !== dayId);
        setActiveIndex((current) => Math.min(current, next.length - 1));
        return next;
      });
    },
    [setPlan, setActiveIndex],
  );

  const renderEditableItem = useCallback(
    ({ getIndex, drag }: RenderItemParams<number>) => {
      const index = getIndex() ?? 0;
      const dayId = badgeOrder[index];

      return (
        <OpacityDecorator>
          <View className="px-1" onLayout={(e) => onLayoutDayBadge && onLayoutDayBadge(index, e)}>
            <DayBadge
              text={`${index + 1}일차`}
              selected={!isEditing && index === activeIndex}
              onPress={!isEditing ? () => handleBadgePress(index) : undefined}
              onLongPress={isEditing ? drag : undefined}
              isEditing={isEditing}
              onDelete={() => handleBadgeDelete(dayId)}
            />
          </View>
        </OpacityDecorator>
      );
    },
    [badgeOrder, isEditing, activeIndex, handleBadgePress, onLayoutDayBadge, handleBadgeDelete],
  );

  const handleDragEnd = useCallback(
    ({ data: ids }: { data: number[] }) => {
      if (!setPlan) return;
      setPlan((prev) =>
        ids
          .map((id) => prev.find((day) => day.id === id))
          .filter((day): day is DayPlan => day !== undefined),
      );
    },
    [setPlan],
  );

  return (
    <View
      className={`${className ?? ""} relative py-3 flex-row items-center`}
      style={{ zIndex: 20 }}
    >
      <View className="flex-1">
        {isEditing ? (
          <DraggableFlatList
            ref={dragListRef}
            data={badgeOrder ?? []}
            onDragEnd={setPlan ? handleDragEnd : undefined}
            keyExtractor={(item) => `day-badge-${item}`}
            renderItem={renderEditableItem}
            horizontal
            activationDistance={10}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: paddingHorizontal,
            }}
          />
        ) : (
          <ScrollView
            ref={targetScrollRef as React.RefObject<ScrollView>}
            horizontal
            showsHorizontalScrollIndicator={false}
            onLayout={onBadgeContainerLayout}
            contentContainerStyle={{
              paddingHorizontal: paddingHorizontal,
            }}
          >
            {badgeOrder.map((dayId, index) => (
              <View
                key={`day-badge-${dayId}`}
                className="px-1"
                onLayout={(e) => onLayoutDayBadge && onLayoutDayBadge(index, e)}
              >
                <DayBadge
                  text={`${index + 1}일차`}
                  selected={index === activeIndex}
                  onPress={() => handleBadgePress(index)}
                  isEditing={false}
                />
              </View>
            ))}
          </ScrollView>
        )}
      </View>

      {showEditButton && setIsEditing && (
        <View className="pr-5 relative">
          <LinearGradient
            pointerEvents="none"
            colors={["transparent", "rgba(255,255,255,0.8)", "white"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              position: "absolute",
              left: -20,
              top: 0,
              bottom: 0,
              width: 20,
              zIndex: 10,
            }}
          />
          <EditToggleBadge
            onPress={isEditing ? handleConfirmOpen : () => setIsEditing(true)}
            isEditing={isEditing}
          />
        </View>
      )}
    </View>
  );
}

export default memo(TimelineDayBadgeSection);
