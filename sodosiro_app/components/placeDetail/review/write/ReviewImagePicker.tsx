import { CameraMiniIcon, RemoveIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import { Dispatch, SetStateAction } from "react";
import { Image, Pressable, View } from "react-native";

import Spinner from "@/components/common/Spinner";
import { compressImage } from "@/util/image/compressImage";
import * as ImagePicker from "expo-image-picker";

type Props = {
  isPending: boolean;
  isPicking: boolean;
  setIsPicking: Dispatch<SetStateAction<boolean>>;
  imageSources: ImagePicker.ImagePickerAsset[];
  setImageSources: Dispatch<SetStateAction<ImagePicker.ImagePickerAsset[]>>;
};

export default function ReviewImagePicker({
  isPending,
  isPicking,
  setIsPicking,
  imageSources = [],
  setImageSources,
}: Props) {
  const handleImage = async () => {
    if (isPending || isPicking) return;

    setIsPicking(true);

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsMultipleSelection: true,
        selectionLimit: 5,
      });

      if (result.canceled) return;

      const compressedImages = await Promise.all(
        result.assets.map((asset) => compressImage(asset)),
      );

      setImageSources(compressedImages);
    } finally {
      setIsPicking(false);
    }
  };

  const removeImage = (index: number) => {
    if (isPending) return;
    setImageSources((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <Pressable
        className={`flex-row gap-1 px-4 py-3 w-full rounded-xl border border-border items-center justify-center`}
        onPress={handleImage}
      >
        {isPicking ? (
          <Spinner size={16} />
        ) : (
          <>
            <CameraMiniIcon color={"#1a1a1a"} />
            <CustomText font="body3 tight">
              {imageSources?.length > 0 ? "사진 변경" : "사진 첨부하기"}
            </CustomText>
          </>
        )}
      </Pressable>
      {isPicking ? (
        <View className={`w-full justify-center items-center py-10`}>
          <Spinner />
        </View>
      ) : (
        imageSources?.length > 0 && (
          <View className={`flex-row flex-wrap`}>
            {imageSources?.map((imageSource, index) => (
              <View
                key={index}
                className={`relative w-1/3 p-1 overflow-hidden`}
              >
                <Image
                  className={`w-full aspect-square rounded-xl`}
                  source={{ uri: imageSource.uri }}
                />
                <Pressable
                  className={`absolute top-2 right-2`}
                  onPress={() => removeImage(index)}
                >
                  <RemoveIcon color={"#ffffff"} />
                </Pressable>
              </View>
            ))}
          </View>
        )
      )}
    </>
  );
}
