import { Pressable, View } from "react-native";
import CustomText from "../common/CustomText";
import { RightIcon } from "@/assets/svgs";

type Props = {
  title: string;
  onPress: () => void;
}

export default function SectionTitle({
  title,
  onPress,
}: Props) {


  return (
    <View className={`flex-row justify-between items-center`}>
      <CustomText className={`text-heading2`}>{title}</CustomText>
      <Pressable 
        className={`flex-row items-center`}
        onPress={onPress}>
        <CustomText className={`text-body1 text-text-muted`}>더보기</CustomText>
        <RightIcon width={20} color={"#888888"} />
      </Pressable>
    </View>
  )
}