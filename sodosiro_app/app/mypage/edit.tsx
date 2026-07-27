import CustomButton from "@/components/common/CustomButton";
import Header from "@/components/common/Header";
import EditProfile from "@/components/mypage/edit/EditProfile";
import EditText from "@/components/mypage/edit/EditText";
import { useUserStore } from "@/stores/useUserStore";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileEditScreen() {
  const {
    nickname,
    introduce,
    imageSource,
    setNickname,
    setIntroduce,
    setImageSource,
  } = useUserStore();

  const [imageSourceTemp, setImageSourceTemp] = useState(imageSource);
  const [nicknameTemp, setNicknameTemp] = useState(nickname);
  const [introduceTemp, setIntroduceTemp] = useState(introduce);

  const handleSave = () => {
    setNickname(nicknameTemp);
    setIntroduce(introduceTemp);
    setImageSource(imageSourceTemp);
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header title={"프로필 설정"} />
      <ScrollView
        contentContainerStyle={{
          padding: 24,
          alignItems: "center",
          gap: 24,
        }}
        showsHorizontalScrollIndicator={false}
      >
        <EditProfile
          imageSourceTemp={imageSourceTemp}
          setImageSourceTemp={setImageSourceTemp}
        />
        <View className={`gap-6 w-full`}>
          <EditText
            title={"닉네임"}
            text={nicknameTemp}
            setText={setNicknameTemp}
            placeholder={nickname}
          />
          <EditText
            title={"한 줄 소개"}
            text={introduceTemp}
            setText={setIntroduceTemp}
            placeholder={introduce}
          />
        </View>
      </ScrollView>
      <View className={`p-5`}>
        <CustomButton
          type="primary"
          title={"저장"}
          disabled={
            nickname === nicknameTemp &&
            introduce === introduceTemp &&
            imageSource === imageSourceTemp
          }
          onPress={handleSave}
        />
      </View>
    </SafeAreaView>
  );
}
