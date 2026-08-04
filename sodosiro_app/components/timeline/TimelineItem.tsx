import { StarIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import Dropdown from "@/components/common/Dropdown";
import { useToast } from "@/contexts/ToastProvider";
import { Pressable, View } from "react-native";
import CategoryTag from "../place/CategoryTag";
import ActionBadge from "../trip/badge/ActionBadge";

type TimelineItemProps = {
  place: PlaceType;
  isExpanded: boolean;
  onToggle: (key: string) => void;
  order: number;
  mode: "isOngoing" | "isUpcoming" | "completed";
  onLongPress?: () => void;
  isEditing?: boolean;
  isAuthCompleted?: boolean;
};

// 일정 하나(장소)를 나타내는 항목. 헤더(순서/제목/카테고리)는 항상 보이고,
// 본문(설명/평점/액션 버튼)은 Dropdown을 통해 펼침/접힘 됩니다.
export default function TimelineItem({
  place,
  isExpanded,
  onToggle,
  order,
  mode,
  onLongPress,
  isEditing = false,
  isAuthCompleted = false,
}: TimelineItemProps) {
  const { showToast } = useToast();

  return (
    <Pressable
      className={`px-4 py-3 bg-bg`}
      onLongPress={isEditing ? onLongPress : undefined}
    >
      <Dropdown
        isExpanded={isExpanded}
        onToggle={!isEditing ? () => onToggle(`${place.id}`) : undefined}
        disabled={isEditing}
        header={
          <View className={`flex-row flex-1`}>
            <View className="w-6 h-6 rounded-xl bg-[#1A1A1A] items-center justify-center mr-2.5">
              <CustomText font="body3" className="text-white">
                {order}
              </CustomText>
            </View>

            <View className={`flex-row gap-1`}>
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
                <CustomText font="body2" className="text-text-muted">
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

            <View className="flex-row gap-2" style={{ alignSelf: "flex-end" }}>
              <ActionBadge
                onPress={() => {
                  // TODO: 장소 상세보기
                }}
                text="장소 상세보기"
                selected={false}
                bgWhite={true}
              />
              {mode === "isOngoing" ? (
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
        )}
      </Dropdown>
    </Pressable>
  );
}
