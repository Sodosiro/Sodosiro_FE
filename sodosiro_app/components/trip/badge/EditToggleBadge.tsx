import { BigCheckIcon, EditPlanIcon } from "@/assets/svgs";
import { AnimatedPressable } from "@/components/common/animated/Animated";

type EditToggleBadgeProps = {
  isEditing: boolean;
  infoTooltipText?: string;
  onPress: (() => void) | undefined;
};

export default function EditToggleBadge({
  isEditing,
  onPress,
}: EditToggleBadgeProps) {
  return (
    <AnimatedPressable
      className={`bg-white border border-border rounded-full min-h-10 items-center justify-center aspect-square z-20`}
      onPress={onPress}
    >
      {isEditing ? (
        <BigCheckIcon color={"#888888"} width={20} height={20} />
      ) : (
        <EditPlanIcon width={20} height={20} />
      )}
    </AnimatedPressable>
  );
}
