import CustomButton from "@/components/common/CustomButton";
import CustomText from "@/components/common/CustomText";
import { ReactNode } from "react";
import { View } from "react-native";

type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onPressAction?: () => void;
};

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onPressAction,
}: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-6">
      {icon ? <View className="mb-4">{icon}</View> : null}

      <CustomText font="body1" className="text-text-primary text-center">
        {title}
      </CustomText>

      {description ? (
        <CustomText font="body2" className="text-text-muted mt-1 text-center">
          {description}
        </CustomText>
      ) : null}

      {actionLabel ? (
        <View className="mt-4">
          <CustomButton type="primary" title={actionLabel} onPress={onPressAction} size="small" />
        </View>
      ) : null}
    </View>
  );
}
