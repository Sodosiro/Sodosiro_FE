import { RightIcon } from "@/assets/svgs";
import { Pressable, View } from "react-native";
import CustomText from "../common/CustomText";

type Props = {
  title: string;
  onPress: () => void;
  isMore?: boolean;
};

export default function SectionTitle({ title, onPress, isMore = true }: Props) {
  return (
    <View className={`flex-row justify-between items-center`}>
      <CustomText font="heading2" className={`pr-0.5`}>
        {title}
      </CustomText>
      {isMore && (
        <Pressable className={`flex-row items-center`} onPress={onPress}>
          <CustomText font="body1" className={`text-text-muted pr-0.5`}>
            더보기
          </CustomText>
          <RightIcon width={20} color={"#888888"} />
        </Pressable>
      )}
    </View>
  );
}
