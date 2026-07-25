import { LeftIcon } from "@/assets/svgs";
import { Heading1Class } from "@/styles/Typography";
import { useNavigation } from "expo-router";

import { Pressable, Text, View } from "react-native";

type Props = {
  title: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
};

export default function Header({
  title,
  showBackButton = true,
  rightComponent,
}: Props) {
  const navigation = useNavigation();

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View className="h-16 flex-row items-center px-5 bg-white">
      {showBackButton ? (
        <Pressable onPress={handleBack} hitSlop={12} className="mr-2">
          <LeftIcon color="#1A1A1A" />
        </Pressable>
      ) : (
        <View className="w-6 mr-4" />
      )}

      <Text className={`flex-1 ${Heading1Class}`}>{title}</Text>

      {rightComponent ?? <View className="w-6" />}
    </View>
  );
}
