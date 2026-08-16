import CustomText from "@/components/common/CustomText";
import Spinner from "@/components/common/Spinner";
import CameraIcon from "@/components/icon/CameraIcon";
import { compressImage } from "@/util/image/compressImage";
import * as ImagePicker from "expo-image-picker";
import { Dispatch, SetStateAction } from "react";
import { Pressable, View } from "react-native";
import ImageCardGrid from "../../ImageCardGrid";

const MAX_IMAGES = 5;

export default function CreateFeedPhotoSection({
  images,
  setImages,
  isPicking,
  setIsPicking,
}: {
  images: ImagePicker.ImagePickerAsset[];
  setImages: Dispatch<SetStateAction<ImagePicker.ImagePickerAsset[]>>;
  isPicking: boolean;
  setIsPicking: Dispatch<SetStateAction<boolean>>;
}) {
  const handlePickImages = async () => {
    if (isPicking) {
      return;
    }

    setIsPicking(true);

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsMultipleSelection: true,
        selectionLimit: MAX_IMAGES,
      });

      if (result.canceled) {
        return;
      }

      const compressedImages = await Promise.all(
        result.assets.map((asset) => compressImage(asset)),
      );

      setImages(compressedImages);
    } finally {
      setIsPicking(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    if (isPicking) {
      return;
    }

    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <View className="gap-3">
      <View className="flex-row justify-between items-center">
        <CustomText font="heading2">사진 추가하기</CustomText>

        <CustomText font="body3" className="text-text-muted">
          {images.length}/{MAX_IMAGES}
        </CustomText>
      </View>

      <View className="gap-3">
        {images.length === 0 && (
          <Pressable
            onPress={handlePickImages}
            disabled={isPicking}
            className="w-full aspect-square rounded-xl bg-bg-subtle items-center justify-center gap-2"
          >
            {isPicking ? (
              <Spinner />
            ) : (
              <>
                <CameraIcon color="#1a1a1a" />

                <CustomText font="body2">사진 첨부하기</CustomText>

                <CustomText font="body3 tight" className="text-text-muted">
                  최대 5장까지 첨부할 수 있어요.
                </CustomText>
              </>
            )}
          </Pressable>
        )}

        {images.length > 0 && (
          <>
            <ImageCardGrid
              images={images}
              canRemove
              onRemove={handleRemoveImage}
            />

            <Pressable
              className="flex-row py-3.5 gap-1 items-center justify-center rounded-xl bg-bg-subtle"
              disabled={isPicking}
              onPress={handlePickImages}
            >
              {isPicking ? (
                <Spinner />
              ) : (
                <>
                  <CameraIcon color="#444444" />

                  <CustomText font="body3 tight">사진 변경하기</CustomText>
                </>
              )}
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
}
