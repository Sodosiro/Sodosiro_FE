import DayBadge from "@/components/trip/badge/DayBadge";
import EditToggleBadge from "@/components/trip/badge/EditToggleBadge";
import { LayoutChangeEvent, View } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";

const FADE_WIDTH = 20;
const FADE_STEPS = 16;
const EDIT_BUTTON_RESERVED_WIDTH = 100;

type TimelineDayBadgeSectionProps = {
  dayIndices: number[];
  activeIndex: number;
  isEditing: boolean;
  showEditButton: boolean;
  onPressDayBadge: (index: number) => void;
  onLayoutDayBadge: (index: number, e: LayoutChangeEvent) => void;
  onRequestDeleteDay: (index: number) => void;
  onPressEditButton: () => void;
  onReorderDays?: (newData: number[]) => void; // 👈 순서 변경 이벤트 핸들러
};

export default function TimelineDayBadgeSection({
  dayIndices,
  activeIndex,
  isEditing,
  showEditButton,
  onPressDayBadge,
  onLayoutDayBadge,
  onRequestDeleteDay,
  onPressEditButton,
  onReorderDays,
}: TimelineDayBadgeSectionProps) {
  // 드래그 아이템 렌더링
  const renderItem = ({ item: index, drag, isActive }: RenderItemParams<number>) => {
    return (
      <ScaleDecorator>
        <DayBadge
          onLayout={(e) => onLayoutDayBadge(index, e)}
          onPress={() => onPressDayBadge(index)}
          onLongPress={isEditing ? drag : undefined} // 💡 수정 모드일 때 롱터치 시 드래그 시작
          disabled={isActive}
          text={`${index + 1}일차`}
          selected={index === activeIndex}
          removable={isEditing && dayIndices.length > 1}
          onDelete={() => onRequestDeleteDay(index)}
        />
      </ScaleDecorator>
    );
  };

  return (
    <View className="relative py-3" style={{ zIndex: 20 }}>
      <DraggableFlatList
        data={dayIndices}
        onDragEnd={({ data }) => onReorderDays?.(data)}
        keyExtractor={(item) => `day-badge-${item}`}
        renderItem={renderItem}
        horizontal={true}
        activationDistance={5}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 20,
          paddingRight: showEditButton ? EDIT_BUTTON_RESERVED_WIDTH : 20,
          gap: 8,
        }}
      />

      {showEditButton && (
        <>
          {/* 스크롤 페이드 뷰 */}
          <View
            pointerEvents="none"
            className="absolute top-0 bottom-0 flex-row"
            style={{
              right: EDIT_BUTTON_RESERVED_WIDTH - 12,
              width: FADE_WIDTH,
            }}
          >
            {Array.from({ length: FADE_STEPS }).map((_, i) => (
              <View key={i} className="flex-1 bg-white" style={{ opacity: (i + 1) / FADE_STEPS }} />
            ))}
          </View>

          {/* 수정하기 / 확인 버튼 */}
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
