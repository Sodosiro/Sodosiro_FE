import { SpotItem } from "@/api/course";
import { AlignIcon, StarIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import Dropdown from "@/components/common/Dropdown";
import { MOCK_TRANSPORT_ROUTE } from "@/mocks/trip";
import { NumberToCategory } from "@/util/place/category";
import { router } from "expo-router";
import { memo } from "react";
import { Pressable, View } from "react-native";
import Tag from "../place/Tag";
import ActionBadge from "../trip/badge/ActionBadge";
import OngoingRouteSummaryCard from "../trip/ongoing/OngoingRouteSummaryCard";

type TimelineItemProps = {
  place: SpotItem;
  isExpanded: boolean;
  isCourseConfirmed: boolean;
  onToggle: (key: string) => void;
  order: number;
  mode: "isOngoing" | "isUpcoming" | "completed";
  onLongPress?: () => void;
  onVerificationPlace?: () => void;
  isEditing?: boolean;
  isAuthCompleted?: boolean;
  isFirstIndex: boolean;
  onChangePlace?: () => void;
};

function TimelineItem({
  place,
  isExpanded,
  isCourseConfirmed,
  onToggle,
  order,
  mode,
  onLongPress,
  onVerificationPlace,
  isEditing = false,
  isAuthCompleted = false,
  isFirstIndex = false,
  onChangePlace,
}: TimelineItemProps) {
  const handleToggle = () => {
    if (!isEditing) {
      onToggle(`${place.contentId}`);
    }
  };

  // 버튼 영역 렌더링 판단 로직을 밖으로 추출
  const renderActionButton = () => {
    if (mode === "isOngoing") {
      if (isAuthCompleted) {
        return (
          <ActionBadge
            onPress={() => {}}
            text="방문 인증 완료"
            selected={true}
            isAuthCompleted={true}
          />
        );
      }
      return (
        <ActionBadge
          onPress={() => onVerificationPlace?.()}
          text="방문 인증하기"
          selected={true}
          isOngoing={true}
          isAuthCompleted={false}
        />
      );
    }

    // 코스가 확정되지 않은 경우에만 "장소 변경하기" 노출
    if (!isCourseConfirmed) {
      return <ActionBadge onPress={() => onChangePlace?.()} text="장소 변경하기" selected={true} />;
    }

    return null;
  };

  return (
    <View className="pb-3 bg-bg">
      <View className="flex-row">
        <View className="w-[24px] mr-[10px] h-3" />
        {isFirstIndex || isEditing ? undefined : (
          <View className="h-3 flex-1 border-t border-[#D9D9D9]" />
        )}
      </View>

      <Dropdown
        isExpanded={isExpanded}
        onToggle={handleToggle}
        disabled={isEditing}
        header={
          // Header 전체 영역을 눌러도 토글 및 롱프레스(편집 모드)가 가능하도록 감싸기
          <Pressable
            className="flex-row flex-1 items-center"
            onPress={handleToggle}
            onLongPress={isEditing ? onLongPress : undefined}
            disabled={isEditing && !onLongPress}
          >
            {isEditing ? (
              <View className="w-6 h-6 items-center mr-2.5 flex-shrink-0">
                <AlignIcon />
              </View>
            ) : (
              <View className="w-6 h-6 rounded-xl bg-[#1A1A1A] items-center justify-center mr-2.5 flex-shrink-0">
                <CustomText font="body3" className="text-white">
                  {order}
                </CustomText>
              </View>
            )}

            <View className="flex-row gap-1 items-center min-w-0 max-w-full flex-shrink">
              <CustomText font="title" numberOfLines={1} className="flex-shrink">
                {place.title}
              </CustomText>

              <View className="flex-shrink-0">
                <Tag category={NumberToCategory[place?.category]} />
              </View>
            </View>
          </Pressable>
        }
      >
        {place && (
          <View className="pl-8.5 gap-2 overflow-visible">
            <View className="gap-1">
              {place.overview && (
                <View>
                  <CustomText
                    font="body2"
                    className="text-text-secondary pr-8"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {place.overview}
                  </CustomText>
                </View>
              )}
              <View className="flex-row items-center gap-1">
                <StarIcon />
                <CustomText font="body2">{place?.avgRating}</CustomText>
                {place.reviewCount !== undefined && (
                  <CustomText font="body3" className="text-text-muted">
                    ({place.reviewCount})
                  </CustomText>
                )}
              </View>
            </View>

            <View className="flex-row gap-2">
              <ActionBadge
                onPress={() => {
                  router.push({
                    pathname: "/place/[placeId]",
                    params: { placeId: place.contentId },
                  });
                }}
                text="장소 상세보기"
                selected={false}
              />

              {renderActionButton()}
            </View>
          </View>
        )}
        {mode === "isOngoing" ? (
          <OngoingRouteSummaryCard
            {...MOCK_TRANSPORT_ROUTE}
            onPressKakaoMap={() => {
              // 카카오맵 딥링크/웹뷰 오픈
            }}
          />
        ) : null}
      </Dropdown>
    </View>
  );
}

export default memo(TimelineItem);
