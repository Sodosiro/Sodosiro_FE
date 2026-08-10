import { StarIcon, SwapIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import Dropdown from "@/components/common/Dropdown";
import { MOCK_TRANSPORT_ROUTE } from "@/mocks/trip";
import { router } from "expo-router";
import { memo } from "react";
import { Pressable, View } from "react-native";
import CategoryTag from "../place/CategoryTag";
import ActionBadge from "../trip/badge/ActionBadge";
import OngoingRouteSummaryCard from "../trip/ongoing/OngoingRouteSummaryCard";

type TimelineItemProps = {
  place: PlaceType;
  isExpanded: boolean;
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

// 일정 하나(장소)를 나타내는 항목. 헤더(순서/제목/카테고리)는 항상 보이고,
// 본문(설명/평점/액션 버튼)은 Dropdown을 통해 펼침/접힘 됩니다.
function TimelineItem({
  place,
  isExpanded,
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
  return (
    <>
      <View className="flex-row">
        <View className="w-[24px] mr-[10px] h-3"></View>
        {isFirstIndex ? undefined : (
          <View className="h-3 flex-1 border-t border-[#D9D9D9]" />
        )}
      </View>
      <Pressable
        className={`pb-3 bg-bg`}
        onLongPress={isEditing ? onLongPress : undefined}
      >
        <Dropdown
          isExpanded={isExpanded}
          onToggle={
            !isEditing ? () => onToggle(`${place.contentId}`) : undefined
          }
          disabled={isEditing}
          header={
            <View className={`flex-row flex-1 items-center`}>
              {isEditing ? (
                <View className="w-6 h-6 items-center mr-2.5">
                  <SwapIcon />
                </View>
              ) : (
                <View className="w-6 h-6 rounded-xl bg-[#1A1A1A] items-center justify-center mr-2.5">
                  <CustomText font="body3" className="text-white">
                    {order}
                  </CustomText>
                </View>
              )}

              <View className={`flex-row gap-1 items-center flex-1`}>
                <CustomText font="title" numberOfLines={1}>
                  {place.title}
                </CustomText>
                <CategoryTag category={place.category} />
              </View>
            </View>
          }
        >
          {place && (
            <View className={`pl-8.5 gap-2`}>
              <View className={`gap-1`}>
                <View>
                  <CustomText font="body2" className="text-text-secondary">
                    {place.desc}
                  </CustomText>
                </View>
                <View className="flex-row items-center gap-1">
                  <StarIcon />
                  <CustomText font="body2">{place?.rate}</CustomText>
                  {place.reviewCount !== undefined && (
                    <CustomText font="body3" className="text-text-muted">
                      ({place.reviewCount})
                    </CustomText>
                  )}
                </View>
              </View>

              <View className="flex-row flex-1 gap-2">
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

                {mode === "isOngoing" ? (
                  isAuthCompleted ? (
                    <ActionBadge
                      onPress={() => {
                        // TODO: 방문 인증하기
                      }}
                      text="방문 인증 완료"
                      selected={true}
                      isAuthCompleted={true}
                    />
                  ) : (
                    <ActionBadge
                      onPress={() => {
                        // showToast("300m 이내에서 인증할 수 있어요");
                        onVerificationPlace?.();
                      }}
                      text="방문 인증하기"
                      selected={true}
                      isOngoing={true}
                      isAuthCompleted={false}
                    />
                  )
                ) : mode === "completed" ? (
                  <ActionBadge
                    onPress={() => {
                      onChangePlace?.();
                    }}
                    text="장소 변경하기"
                    selected={true}
                  />
                ) : null}
              </View>
            </View>
          )}
          <OngoingRouteSummaryCard
            {...MOCK_TRANSPORT_ROUTE}
            onPressKakaoMap={() => {
              // 카카오맵 딥링크/웹뷰 오픈
            }}
          />
        </Dropdown>
      </Pressable>
    </>
  );
}

export default memo(TimelineItem);
