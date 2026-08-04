import DayBadge from "@/components/trip/badge/DayBadge";
import EditToggleBadge from "@/components/trip/badge/EditToggleBadge";
import { LinearGradient } from "expo-linear-gradient";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { LayoutChangeEvent, ScrollView, View } from "react-native";
import DraggableFlatList, {
  OpacityDecorator,
  RenderItemParams,
} from "react-native-draggable-flatlist";

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
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  paddingHorizontal?: number;
};

export default function TimelineDayBadgeSection({
  badgeOrder,
  isEditing = false,
  setIsEditing,
  showEditButton,
  className,
  setPlan,
  handleConfirmOpen,
  onPressDayBadge,
  onLayoutDayBadge,
  activeIndex,
  setActiveIndex,
  paddingHorizontal = 20,
}: TimelineDayBadgeSectionProps) {
  const viewScrollRef = useRef<ScrollView>(null);
  const dragListRef = useRef<any>(null);

  // isEditing 전환 시 -> 배지 스크롤을 가장 왼쪽으로 리셋
  useEffect(() => {
    if (isEditing) {
      dragListRef.current?.scrollToOffset?.({ offset: 0, animated: false });
    } else {
      viewScrollRef.current?.scrollTo({ x: 0, animated: false });
    }
  }, [isEditing]);

  const renderEditableItem = ({ getIndex, drag }: RenderItemParams<number>) => {
    const index = getIndex() ?? 0;
    const dayId = badgeOrder[index];

    return (
      <OpacityDecorator>
        <View className={`px-1`}>
          <DayBadge
            text={`${index + 1}일차`}
            selected={!isEditing && index === activeIndex}
            onPress={
              !isEditing
                ? () => {
                    setActiveIndex(index);
                    onPressDayBadge && onPressDayBadge(index);
                  }
                : undefined
            }
            onLongPress={isEditing ? drag : undefined}
            isEditing={isEditing}
            onLayout={(e) => onLayoutDayBadge && onLayoutDayBadge(index, e)}
            onDelete={() => {
              if (!setPlan) return;

              setPlan((prev) => {
                const next = prev.filter((day) => day.id !== dayId);

                setActiveIndex((current) => Math.min(current, next.length - 1));

                return next;
              });
            }}
          />
        </View>
      </OpacityDecorator>
    );
  };

  return (
    <View
      className={`${className} relative py-3 flex-row items-center`}
      style={{ zIndex: 20 }}
    >
      <View className="flex-1">
        <DraggableFlatList
          ref={dragListRef}
          data={badgeOrder ?? []}
          onDragEnd={
            setPlan
              ? ({ data: ids }) => {
                  setPlan((prev) =>
                    ids
                      .map((id) => prev.find((day) => day.id === id))
                      .filter((day): day is DayPlan => day !== undefined),
                  );
                }
              : undefined
          }
          keyExtractor={(item) => `day-badge-${item}`}
          renderItem={renderEditableItem}
          horizontal
          activationDistance={10}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: paddingHorizontal,
          }}
        />
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
