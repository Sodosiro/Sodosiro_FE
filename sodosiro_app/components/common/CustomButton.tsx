import { Text, View } from "react-native";
import Spinner from "./Spinner";
import { BigCheckIcon } from "@/assets/svgs";
import AnimatedButton from "./AnimatedButton";
import { Body3TightClass, TitleTightClass } from "@/styles/Typography";

type ButtonProps = {
  type: "primary" | "secondary" | "tertiary";
  stretch?: boolean;
  title: string;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  checked?: boolean;
  loading?: boolean;
  onPress?: () => void;
};

export default function CustomButton({
  type,
  stretch = false,
  title,
  size = "large",
  checked = false,
  disabled = false,
  loading = false,
  onPress,
}: ButtonProps) {
  const PrimaryColor = ["#C4D96A", "#A9C92D"];
  const SecondaryColor = ["#1A1A1A", "#3D3D3D"];
  const TertiaryColor = ["#F5F5F5", "#E2E2E8"];

  const backgroundColor =
    type === "primary"
      ? PrimaryColor
      : type === "secondary"
        ? SecondaryColor
        : TertiaryColor;

  const primaryButtonSize =
    size === "large"
      ? "h-13"
      : size === "medium"
        ? "w-[235px] h-13"
        : "self-start px-4 h-11";
  const secondaryButtonSize = "self-start px-4 h-11";
  const tertiaryButtonSize = "self-start px-4 h-11";

  const textSize =
    type === "primary" && size !== "small" ? TitleTightClass : Body3TightClass;

  const textClass = disabled
    ? "text-text-muted"
    : type === "secondary"
      ? "text-btn-secondary-text"
      : "text-text-primary";
  const textColor = disabled
    ? "#888888"
    : type === "secondary"
      ? "#FFFFFF"
      : "#1A1A1A";

  const borderClass = "border border-border";

  return (
    <AnimatedButton
      className={`${stretch ? `flex-1` : ``}
        flex justify-center items-center ${type === "primary" ? primaryButtonSize : type === "secondary" ? secondaryButtonSize : tertiaryButtonSize} rounded-full ${type === "tertiary" ? borderClass : ``}`}
      disabled={disabled || loading}
      loading={loading}
      backgroundColor={backgroundColor}
      disabledColor="#F4F4F4"
      onPress={onPress}
    >
      {!loading ? (
        <View className={`flex flex-row justify-center items-center gap-1`}>
          {checked && <BigCheckIcon color={textColor} />}
          <Text className={`${textSize} ${textClass}`}>{title}</Text>
        </View>
      ) : (
        <Spinner color={type === "secondary" ? "#FFFFFF" : "#1A1A1A"} />
      )}
    </AnimatedButton>
  );
}
