import * as ImagePicker from "expo-image-picker";
import ImageResizer from "react-native-image-resizer";

const MAX_FILE_SIZE = 1 * 1024 * 1024;

const RESIZE_SIZES = [1600, 1400, 1200, 1000, 800, 400];
const QUALITY_STEP = 10;

export const compressImage = async (asset: ImagePicker.ImagePickerAsset) => {
  for (const size of RESIZE_SIZES) {
    let quality = 100;

    while (quality >= 10) {
      const result = await ImageResizer.createResizedImage(
        asset.uri,
        size,
        size,
        "JPEG",
        quality,
      );

      const response = await fetch(result.uri);
      const blob = await response.blob();

      if (blob.size <= MAX_FILE_SIZE) {
        return {
          ...asset,
          uri: result.uri,
          width: result.width,
          height: result.height,
          fileSize: blob.size,
          mimeType: "image/jpeg",
          fileName: `review_${Date.now()}.jpg`,
        };
      }

      quality -= QUALITY_STEP;
    }
  }

  const result = await ImageResizer.createResizedImage(
    asset.uri,
    400,
    400,
    "JPEG",
    10,
  );

  const response = await fetch(result.uri);
  const blob = await response.blob();

  return {
    ...asset,
    uri: result.uri,
    width: result.width,
    height: result.height,
    fileSize: blob.size,
    mimeType: "image/jpeg",
  };
};
