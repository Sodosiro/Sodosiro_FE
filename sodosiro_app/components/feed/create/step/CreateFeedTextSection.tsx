import CustomText from "@/components/common/CustomText";
import { Dispatch, SetStateAction } from "react";
import { TextInput, View } from "react-native";

const MAX_TEXT_LENGTH = 300;

export default function CreateFeedTextSection({
  text,
  setText,
  editable,
}: {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  editable: boolean;
}) {
  return (
    <View className="gap-3">
      <CustomText font="heading2">감상 한마디</CustomText>

      <View className="px-3 pb-5 rounded-xl border border-border">
        <TextInput
          className="min-h-24"
          value={text}
          onChangeText={setText}
          placeholder="이곳에서 느낀 감정을 한마디로 남겨보세요."
          multiline
          scrollEnabled={false}
          maxLength={MAX_TEXT_LENGTH}
          textAlignVertical="top"
          editable={!editable}
        />

        <CustomText
          font="body3"
          className="absolute right-3 bottom-3 text-text-muted"
        >
          {text.length}/{MAX_TEXT_LENGTH}
        </CustomText>
      </View>
    </View>
  );
}
