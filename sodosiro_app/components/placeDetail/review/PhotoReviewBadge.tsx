import { CameraMiniIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import { Dispatch, SetStateAction } from "react";
import { Pressable } from "react-native";

export default function PhotoReviewBadge({
  isSelected,
  setIsSelected,
}: {
  isSelected: boolean;
  setIsSelected: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Pressable
      className={`px-4 py-2.5 rounded-full self-start flex-row gap-1 border border-border ${isSelected ? `bg-text-primary` : `bg-bg`}`}
      onPress={() => setIsSelected(!isSelected)}
    >
      <CameraMiniIcon color={isSelected ? "#ffffff" : "#1a1a1a"} />
      <CustomText
        font="body3 tight"
        className={`${isSelected ? `text-btn-secondary-text` : `text-text-primary`}`}
      >
        포토 리뷰
      </CustomText>
    </Pressable>
  );
}
