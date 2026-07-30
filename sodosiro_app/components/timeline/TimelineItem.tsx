import { StarIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import Dropdown from "@/components/common/Dropdown";
import { useToast } from "@/contexts/ToastProvider";
import { CategoryMap } from "@/util/place/category";
import { View } from "react-native";
import ActionBadge from "../trip/badge/ActionBadge";

type TimelineItemProps = {
  place: PlaceType;
  isLast: boolean;
  isExpanded: boolean;
  onToggle: (key: string) => void;
  order: number;
  expandKey: string;
  isOngoing: boolean;
  isUpcoming: boolean;
  isAuthCompleted?: boolean;
};

// 일정 하나(장소)를 나타내는 항목. 헤더(순서/제목/카테고리)는 항상 보이고,
// 본문(설명/평점/액션 버튼)은 Dropdown을 통해 펼침/접힘 됩니다.
export default function TimelineItem({
  place,
  isLast,
  isExpanded,
  onToggle,
  order,
  expandKey,
  isOngoing,
  isUpcoming,
  isAuthCompleted = false,
}: TimelineItemProps) {
  const { showToast } = useToast();

  return (
    <View className={`px-4 py-3 ${isLast ? "" : "border-b border-[#EDEDED]"}`}>
      <Dropdown
        isExpanded={isExpanded}
        onToggle={() => onToggle(String(expandKey))}
        header={
          <>
            <View className="w-6 h-6 rounded-xl bg-[#1A1A1A] items-center justify-center mr-2.5">
              <CustomText font="body3" className="text-white">
                {order}
              </CustomText>
            </View>

            <CustomText font="body1" numberOfLines={1} className="flex-shrink">
              {place.title}
            </CustomText>

            <View className="ml-1.5 px-1.5 py-1.5 rounded-md bg-bg-subtle">
              <CustomText font="body2 tight">{CategoryMap[place.category]}</CustomText>
            </View>
          </>
        }
      >
        <View>
          {place.desc && (
            <View style={{ paddingLeft: 34 }}>
              <CustomText font="body2" className="text-text-muted mb-1.5">
                {place.desc}
              </CustomText>
            </View>
          )}

          {place.lat !== undefined && (
            <View className="flex-row items-center" style={{ paddingLeft: 34 }}>
              <StarIcon />
              <CustomText font="body2" className="ml-1">
                {place.lat.toFixed(1)}
              </CustomText>
              {place.reviewCount !== undefined && (
                <CustomText font="body2" className="text-text-muted ml-1">
                  ({place.reviewCount})
                </CustomText>
              )}
            </View>
          )}

          <View className="flex-row gap-2 mt-3" style={{ alignSelf: "flex-end" }}>
            <ActionBadge
              onPress={() => {
                // TODO: 장소 상세보기
              }}
              text="장소 상세보기"
              selected={false}
              bgWhite={true}
            />
            {isOngoing ? (
              isAuthCompleted ? (
                <ActionBadge
                  onPress={() => {
                    // TODO: 방문 인증하기
                  }}
                  text={"방문 인증 완료"}
                  selected={true}
                  bgWhite={true}
                  isAuthCompleted={true}
                />
              ) : (
                <ActionBadge
                  onPress={() => {
                    showToast("300m 이내에서 인증할 수 있어요");
                  }}

                  text={"방문 인증하기"}
                  selected={true}
                  bgWhite={true}
                  isOngoing={true}
                  isAuthCompleted={false}
                />
              )
            ) : (
              <ActionBadge
                onPress={() => {
                  // TODO: 다른 곳으로 변경하기
                }}
                text="다른 곳으로 변경하기"
                selected={true}
                bgWhite={true}
              />
            )}
          </View>
        </View>
      </Dropdown>
    </View>
  );
}
