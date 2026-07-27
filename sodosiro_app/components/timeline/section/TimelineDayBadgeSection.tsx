import TimelineBadge from "@/components/timeline/TimelineBadge";
import { RefObject } from "react";
import { LayoutChangeEvent, ScrollView, View } from "react-native";

const FADE_WIDTH = 16;
const FADE_STEPS = 16;

type DayBadgeBarProps = {
  dayIndices: number[];
  activeIndex: number;
  isEditing: boolean;
  editButtonWidth: number;
  badgeScrollRef: RefObject<ScrollView | null>;
  showEditButton: boolean;
  onPressDayBadge: (index: number) => void;
  onLayoutDayBadge: (index: number, e: LayoutChangeEvent) => void;
  onRequestDeleteDay: (index: number) => void;
  onPressEditButton: () => void;
  onLayoutEditButton: (e: LayoutChangeEvent) => void;
};

// 상단 "N일차" 뱃지 가로 스크롤 바 + 오른쪽 페이드 효과 + 수정하기/확인 버튼
export default function DayBadgeBar({
  dayIndices,
  activeIndex,
  isEditing,
  editButtonWidth,
  badgeScrollRef,
  showEditButton,
  onPressDayBadge,
  onLayoutDayBadge,
  onRequestDeleteDay,
  onPressEditButton,
  onLayoutEditButton,
}: DayBadgeBarProps) {
  return (
    <View className="relative py-2" style={{ zIndex: 20 }}>
      <ScrollView
        ref={badgeScrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 20,
          paddingRight: showEditButton ? editButtonWidth + 12 : 0,
          gap: 8,
        }}
      >
        {dayIndices.map((index) => (
          <TimelineBadge
            key={index}
            onLayout={(e) => onLayoutDayBadge(index, e)}
            onPress={() => onPressDayBadge(index)}
            text={`${index + 1}일차`}
            selected={index === activeIndex}
            removable={isEditing}
            onDelete={() => onRequestDeleteDay(index)}
          />
        ))}
      </ScrollView>

      {showEditButton && (
        <>
          {/* 스크롤 페이드 뷰 */}
          <View
            pointerEvents="none"
            className="absolute top-0 bottom-0 flex-row"
            style={{
              right: editButtonWidth,
              width: FADE_WIDTH,
            }}
          >
            {Array.from({ length: FADE_STEPS }).map((_, i) => (
              <View key={i} className="flex-1 bg-white" style={{ opacity: (i + 1) / FADE_STEPS }} />
            ))}
          </View>

          {/* 수정하기 / 확인 버튼 */}
          <View className="absolute top-0 bottom-0 right-0 justify-center items-end bg-white pr-5">
            <TimelineBadge
              onLayout={onLayoutEditButton}
              onPress={onPressEditButton}
              text={isEditing ? "확인" : "수정하기"}
              selected={false}
              isEditButton={true}
              isEditing={isEditing}
            />
          </View>
        </>
      )}
    </View>
  );
}
