import CustomText from "@/components/common/CustomText";
import { Dispatch, SetStateAction } from "react";
import { TextInput, View } from "react-native";
import ReviewImagePicker from "./ReviewImagePicker";

type Props = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  imageSource: string | null;
  setImageSource: Dispatch<SetStateAction<string | null>>;
};

export default function ReviewForm({
  content,
  setContent,
  imageSource,
  setImageSource,
}: Props) {
  return (
    <View className={`gap-3`}>
      <CustomText font="heading2">솔직한 리뷰를 남겨주세요.</CustomText>
      <View className={`gap-2`}>
        <View className={`px-3 pb-5 rounded-xl border border-border`}>
          <TextInput
            className={`min-h-24`}
            value={content}
            onChangeText={setContent}
            placeholder="어떤 점이 좋았나요? 다른 여행자에게 도움이 될 내용을 남겨주세요."
            multiline
            scrollEnabled={false}
            maxLength={300}
            textAlignVertical="top"
          />
          <CustomText
            font="body3"
            className={`absolute right-3 bottom-3 text-text-muted`}
          >
            {content.length}/300
          </CustomText>
        </View>
        <ReviewImagePicker
          imageSource={imageSource}
          setImageSource={setImageSource}
        />
      </View>
    </View>
  );
}
