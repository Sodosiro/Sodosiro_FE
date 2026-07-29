import CustomButton from "@/components/common/CustomButton";
import CustomText from "@/components/common/CustomText";
import Header from "@/components/common/Header";
import Rating from "@/components/placeDetail/review/write/Rating";
import ReviewForm from "@/components/placeDetail/review/write/ReviewForm";
import { hasBatchim } from "@/util/word/word";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PlaceDetailScreen() {
  const { title } = useLocalSearchParams<{
    title: string;
  }>();
  const particle = hasBatchim(title) ? "은" : "는";
  const [content, setContent] = useState("");
  const [imageSource, setImageSource] = useState<string | null>(null);
  const [rate, setRate] = useState(0);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <Header title="리뷰 작성하기" />
      <ScrollView contentContainerClassName={`pt-4.5 px-5 gap-8 grow`}>
        <View className={`gap-3`}>
          <CustomText font="heading2">
            {title}
            <Text className={`text-text-muted`}>{particle} 어떠셨나요?</Text>
          </CustomText>
          <Rating rate={rate} setRate={setRate} />
        </View>
        <ReviewForm
          content={content}
          setContent={setContent}
          imageSource={imageSource}
          setImageSource={setImageSource}
        />
      </ScrollView>
      <View className={`p-5 bg-bg`}>
        <CustomButton
          type="primary"
          title="등록하기"
          disabled={rate === 0 || content.trim() === ""}
        />
      </View>
    </SafeAreaView>
  );
}
