import { Pressable, View } from "react-native";
import CustomText from "../common/CustomText";
import { RightIcon } from "@/assets/svgs";

type Props = {
  title: string;
  onPress: () => void;
};

export default function SectionTitle({ title, onPress }: Props) {
  return (
    <View className={`flex-row justify-between items-center`}>
      <CustomText font="heading2">{title}</CustomText>
      <Pressable className={`flex-row items-center`} onPress={onPress}>
        <CustomText font="body1" className={`text-text-muted`}>
          더보기
        </CustomText>
        <RightIcon width={20} color={"#888888"} />
      </Pressable>
    </View>
  );
}
