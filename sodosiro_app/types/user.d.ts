import { ImagePickerAsset } from "expo-image-picker";

declare global {
  type User = {
    nickName: string;
    profileImage: string | ImagePickerAsset | null;
    introduction: string | null;
    email: string | null;
  };
}
