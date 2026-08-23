import CustomText from "@/components/common/CustomText";
import * as ImagePicker from "expo-image-picker";
import { Dispatch, SetStateAction, useState } from "react";
import { Image, Modal, Pressable } from "react-native";

export default function EditProfileImage({
  profileImageTemp,
  setProfileImageTemp,
  disabled,
}: {
  profileImageTemp: string | ImagePicker.ImagePickerAsset | null;
  setProfileImageTemp: Dispatch<
    SetStateAction<string | ImagePicker.ImagePickerAsset | null>
  >;
  disabled?: boolean;
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleChangeProfileImage = async () => {
    setIsModalVisible(false);

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfileImageTemp(result.assets[0]);
    }
  };

  const handleResetProfileImage = () => {
    setProfileImageTemp(null);
    setIsModalVisible(false);
  };

  return (
    <>
      <Pressable
        className="items-center gap-2"
        onPress={() => setIsModalVisible(true)}
        disabled={disabled}
      >
        <Image
          className="h-25 w-25 rounded-full"
          resizeMode="cover"
          source={
            profileImageTemp
              ? {
                  uri:
                    typeof profileImageTemp === "string"
                      ? profileImageTemp
                      : profileImageTemp.uri,
                }
              : require("@/assets/images/profile_default.png")
          }
        />

        <CustomText font="body1" className="text-text-secondary">
          사진 변경
        </CustomText>
      </Pressable>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <Pressable
          className="flex-1 items-center justify-center bg-[rgba(0,0,0,0.5)]"
          onPress={() => setIsModalVisible(false)}
        >
          <Pressable
            className="w-[80%] rounded-2xl bg-white px-5 py-1"
            onPress={(event) => event.stopPropagation()}
          >
            <Pressable
              className="border-b border-gray-100 py-4"
              onPress={handleResetProfileImage}
            >
              <CustomText font="body1" className={`text-center`}>
                기본 이미지로 변경
              </CustomText>
            </Pressable>

            <Pressable className="py-4" onPress={handleChangeProfileImage}>
              <CustomText font="body1" className={`text-center`}>
                내 사진에서 선택
              </CustomText>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
