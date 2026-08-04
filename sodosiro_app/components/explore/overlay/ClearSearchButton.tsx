import { RefreshMiniIcon } from "@/assets/svgs";
import AnimatedButton from "@/components/common/animated/AnimatedButton";
import CustomText from "../../common/CustomText";

export default function ClearSearchButton({
  className,
  onPress,
}: {
  className?: string;
  onPress?: () => void;
}) {
  return (
    <AnimatedButton
      backgroundColor={["#FFFFFF", "#F5F5F5"]}
      className={`${className} flex-row items-center gap-1 px-4 py-3 rounded-full border border-border bg-white`}
      onPress={onPress}
    >
      <RefreshMiniIcon />
      <CustomText font="body3 tight">검색 초기화</CustomText>
    </AnimatedButton>
  );
}
