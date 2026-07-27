import { RightIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import { Pressable, Text, View } from "react-native";
import MypageSectionContainer from "./MypageSectionContainer";

export default function MyBadgeSection({
  level,
  title,
  exp,
  maxExp,
}: {
  level: number;
  title: string;
  exp: number;
  maxExp: number;
}) {
  return (
    <MypageSectionContainer title="내 배지">
      <Pressable className={`border border-border rounded-xl p-3 gap-3`}>
        <View className={`flex-row justify-between items-center`}>
          <CustomText font="title">
            Lv.{level} {title}
          </CustomText>
          <CustomText font="body2" className={`text-text-muted`}>
            {exp}/{maxExp}
          </CustomText>
        </View>
        <View className={`rounded-full w-full h-2.5 bg-bg-soft`}>
          <View
            className={`rounded-full w-full h-2.5 bg-primary`}
            style={{ width: `${(exp / maxExp) * 100}%` }}
          />
        </View>
        <View className={`flex-row justify-between items-center`}>
          <CustomText font="body2" className={`text-text-secondary`}>
            다음 레벨까지 배지{" "}
            <Text className={`text-primary-pressed`}>{maxExp - exp}개</Text>{" "}
            남았어요!
          </CustomText>
          <RightIcon width={16} color={"#888888"} />
        </View>
      </Pressable>
    </MypageSectionContainer>
  );
}
