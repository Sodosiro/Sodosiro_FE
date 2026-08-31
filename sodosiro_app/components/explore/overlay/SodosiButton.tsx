import { AnimatedPressable } from "@/components/common/animated/Animated";
import CustomText from "@/components/common/CustomText";
import useSelectedAnimation from "@/hooks/useSelcetedAnimation";
import { useExploreStore } from "@/stores/useExploreStore";
import { badgeStyle } from "@/styles/Badge";

export default function SodosiButton() {
  const onlySmallTown = useExploreStore((state) => state.onlySmallTown);
  const setOnlySmallTown = useExploreStore((state) => state.setOnlySmallTown);

  const { containerStyle, borderStyle } = useSelectedAnimation(onlySmallTown, {
    background: ["#FFFFFF", "#C4D96A"],
    border: ["#D9D9D9", "#C4D96A"],
  });

  return (
    <AnimatedPressable
      style={[containerStyle, borderStyle]}
      className={`${badgeStyle} px-4`}
      onPress={() => setOnlySmallTown(!onlySmallTown)}
    >
      <CustomText font="body3 tight">소도시만</CustomText>
    </AnimatedPressable>
  );
}
