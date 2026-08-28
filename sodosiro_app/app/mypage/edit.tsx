import { patchMeApi } from "@/api/user";
import CustomButton from "@/components/common/CustomButton";
import Header from "@/components/common/Header";
import EditProfileImage from "@/components/mypage/edit/EditProfileImage";
import EditText from "@/components/mypage/edit/EditText";
import { useUserStore } from "@/stores/useUserStore";
import { ImagePickerAsset } from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileEditScreen() {
  const { user, setUser } = useUserStore();

  const [profileImageTemp, setProfileImageTemp] = useState<
    string | ImagePickerAsset | null
  >(user?.profileImage as string | ImagePickerAsset | null);
  const [nickNameTemp, setNickNameTemp] = useState<string>(
    user?.nickName ?? "",
  );
  const [introductionTemp, setIntroductionTemp] = useState<string>(
    user?.introduction || "",
  );

  const [isPending, setIsPending] = useState(false);

  const handleSave = async () => {
    if (nickNameTemp && nickNameTemp.length > 1 && nickNameTemp.length < 20) {
      setIsPending(true);
      try {
        const updatedUser = await patchMeApi({
          nickName: nickNameTemp,
          introduction: introductionTemp,
          profileImage: profileImageTemp,
        });
        setUser(updatedUser);
        router.back();
      } catch (error: any) {
      } finally {
        setIsPending(false);
      }
    }
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
        <EditProfileImage
          profileImageTemp={profileImageTemp}
          setProfileImageTemp={setProfileImageTemp}
          disabled={isPending}
        />
        <View className={`gap-6 w-full`}>
          <EditText
            title={"닉네임"}
            text={nickNameTemp}
            setText={setNickNameTemp}
            placeholder={user?.nickName || "닉네임을 정해보세요"}
            maxLength={10}
            disabled={isPending}
          />
          <EditText
            title={"한 줄 소개"}
            text={introductionTemp}
            setText={setIntroductionTemp}
            placeholder={
              user?.introduction || "강원도의 숨은 소도시를 탐험 중이에요!"
            }
            maxLength={20}
            disabled={isPending}
          />
        </View>
      </ScrollView>
      <View className={`p-5`}>
        <CustomButton
          type="primary"
          title={"저장"}
          disabled={
            nickNameTemp.trim().length < 2 ||
            nickNameTemp.trim().length > 10 ||
            introductionTemp.trim().length > 20 ||
            (user?.nickName === nickNameTemp &&
              user?.introduction === introductionTemp &&
              user?.profileImage === profileImageTemp)
          }
          onPress={handleSave}
          loading={isPending}
        />
      </View>
    </SafeAreaView>
  );
}
