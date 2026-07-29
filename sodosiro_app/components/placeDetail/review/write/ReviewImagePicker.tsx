import { CameraMiniIcon, RemoveIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import { Dispatch, SetStateAction } from "react";
import { Image, Pressable, View } from "react-native";

import * as ImagePicker from "expo-image-picker";

type Props = {
  imageSource: string | null;
  setImageSource: Dispatch<SetStateAction<string | null>>;
};

export default function ReviewImagePicker({
  imageSource,
  setImageSource,
}: Props) {
  const handleImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageSource(result.assets[0].uri);
    }
  };

  return (
    <>
      <Pressable
        className={`flex-row gap-1 px-4 py-3 w-full rounded-xl border border-border justify-center`}
        onPress={handleImage}
      >
        <CameraMiniIcon color={"#1a1a1a"} />
        <CustomText font="body3 tight">
          {imageSource ? "사진 변경" : "사진 첨부하기"}
        </CustomText>
      </Pressable>
      {imageSource && (
        <View className={`relative w-30 rounded-xl overflow-hidden`}>
          <Image
            className={`w-full aspect-square`}
            source={{ uri: imageSource }}
          />
          <Pressable
            className={`absolute top-1 right-1`}
            onPress={() => setImageSource(null)}
          >
            <RemoveIcon color={"#ffffff"} />
          </Pressable>
        </View>
      )}
    </>
  );
}
