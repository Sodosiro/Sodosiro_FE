import SortBadge from "@/components/common/sort/SortBadge";
import { SORT_OPTIONS } from "@/constants/Sort";
import { Dispatch, SetStateAction } from "react";
import { View } from "react-native";
import PhotoReviewBadge from "./PhotoReviewBadge";

export default function ReviewFilter({
  sortOption,
  setSortOption,
  onlyPhotoReview,
  setOnlyPhotoReview,
}: {
  sortOption: SortType;
  setSortOption: Dispatch<SetStateAction<SortType>>;
  onlyPhotoReview: boolean;
  setOnlyPhotoReview: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <View className={`flex-row gap-2 pb-4`}>
      <SortBadge
        sortOption={sortOption}
        setSortOption={setSortOption}
        sortOptions={SORT_OPTIONS}
      />
      <PhotoReviewBadge
        isSelected={onlyPhotoReview}
        setIsSelected={setOnlyPhotoReview}
      />
    </View>
  );
}
