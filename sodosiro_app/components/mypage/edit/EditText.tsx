import CustomText from "@/components/common/CustomText";
import { Body3Class } from "@/styles/Typography";
import { Dispatch, SetStateAction } from "react";
import { TextInput, View } from "react-native";

export default function EditText({
  title,
  placeholder,
  text,
  setText,
  maxLength,
}: {
  title: string;
  placeholder: string;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  maxLength?: number;
}) {
  return (
    <View className={`gap-2`}>
      <CustomText font="body1">{title}</CustomText>
      <TextInput
        value={text}
        onChangeText={setText}
        returnKeyType="search"
        placeholder={placeholder}
        placeholderTextColor={"#888888"}
        className={`${Body3Class} text-text-secondary w-full p-4 border border-border rounded-xl`}
        maxLength={maxLength}
      />
    </View>
  );
}
