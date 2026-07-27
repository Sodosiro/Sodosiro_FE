import { ImageSourcePropType } from "react-native";
import { create } from "zustand";

interface UserStore {
  nickname: string;
  introduce: string;
  imageSource: ImageSourcePropType | string | null;

  setNickname: (text: string) => void;
  setIntroduce: (text: string) => void;
  setImageSource: (imageSource: ImageSourcePropType | string | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  nickname: "여행하는 지우",
  introduce: "강원도이 숨은 소도시를 탐험 중이에요!",
  imageSource: null,

  setNickname: (text) => set({ nickname: text }),
  setIntroduce: (text) => set({ introduce: text }),
  setImageSource: (imageSource) => set({ imageSource: imageSource }),
}));
