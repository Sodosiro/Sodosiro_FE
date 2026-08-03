import DayBadge from "@/components/trip/badge/DayBadge";
import EditableDayBadge from "@/components/trip/badge/EditableDayBadge";
import EditToggleBadge from "@/components/trip/badge/EditToggleBadge";
import { useEffect, useRef } from "react";
import { LayoutChangeEvent, ScrollView, View } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";

const FADE_WIDTH = 20;
const FADE_STEPS = 16;
const EDIT_BUTTON_RESERVED_WIDTH = 100;

type TimelineDayBadgeSectionProps = {
  dayIndices: number[]; // 조회 모드 배지 순서 (삭제만 반영, 재정렬 X)
  badgeOrder?: number[]; // 수정 모드 배지 순서 (삭제 + 드래그 재정렬 반영)
  activeIndex?: number;
  isEditing: boolean;
  showEditButton: boolean;
  className?: string;
  onPressDayBadge?: (index: number) => void;
  onLayoutDayBadge?: (index: number, e: LayoutChangeEvent) => void;
  onRequestDeleteDay?: (index: number) => void;
  onPressEditButton: () => void;
  onReorderDays?: (newData: number[]) => void;
};

export default function TimelineDayBadgeSection({
  dayIndices,
  badgeOrder,
  activeIndex,
  isEditing,
  showEditButton,
  className,
  onPressDayBadge,
  onLayoutDayBadge,
  onRequestDeleteDay,
  onPressEditButton,
  onReorderDays,
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

  const renderEditableItem = ({ item: index, drag, isActive }: RenderItemParams<number>) => (
    <ScaleDecorator>
      <EditableDayBadge
        text={`${index + 1}일차`}
        isActive={isActive}
        onLongPress={drag}
        onDelete={() => onRequestDeleteDay && onRequestDeleteDay(index)}
      />
    </ScaleDecorator>
  );

  return (
    <View className={className ? className : "relative py-3"} style={{ zIndex: 20 }}>
      {isEditing ? (
        <DraggableFlatList
          ref={dragListRef}
          data={badgeOrder ?? []}
          onDragEnd={({ data }) => onReorderDays && onReorderDays(data)}
          keyExtractor={(item) => `day-badge-${item}`}
          renderItem={renderEditableItem}
          horizontal
          activationDistance={5}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 20,
            paddingRight: showEditButton ? EDIT_BUTTON_RESERVED_WIDTH : 20,
            gap: 8,
          }}
        />
      ) : (
        <ScrollView
          ref={viewScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 20,
            paddingRight: showEditButton ? EDIT_BUTTON_RESERVED_WIDTH : 20,
            gap: 8,
          }}
        >
          {(dayIndices ?? []).map((index) => (
            <DayBadge
              key={index}
              text={`${index + 1}일차`}
              selected={index === activeIndex}
              onPress={() => onPressDayBadge && onPressDayBadge(index)}
              onLayout={(e) => onLayoutDayBadge && onLayoutDayBadge(index, e)}
            />
          ))}
        </ScrollView>
      )}

      {showEditButton && (
        <>
          <View
            pointerEvents="none"
            className="absolute top-0 bottom-0 flex-row"
            style={{ right: EDIT_BUTTON_RESERVED_WIDTH - 12, width: FADE_WIDTH }}
          >
            {Array.from({ length: FADE_STEPS }).map((_, i) => (
              <View key={i} className="flex-1 bg-white" style={{ opacity: (i + 1) / FADE_STEPS }} />
            ))}
          </View>

          <View
            className="absolute top-0 bottom-0 right-0 justify-center items-end bg-white pr-5"
            style={{ zIndex: 30 }}
          >
            <EditToggleBadge onPress={onPressEditButton} isEditing={isEditing} />
          </View>
        </>
      )}
    </View>
  );
}
