import SortBadge from "@/components/common/sort/SortBadge";
import { Dispatch, SetStateAction } from "react";
import { View } from "react-native";
import PhotoReviewBadge from "./PhotoReviewBadge";

export default function ReviewFilter({
  isSortModalVisible,
  setIsSortModalVisible,
  sortOption,
  setSortOption,
  onlyPhotoReview,
  setOnlyPhotoReview,
}: {
  isSortModalVisible: boolean;
  setIsSortModalVisible: Dispatch<SetStateAction<boolean>>;
  sortOption: string;
  setSortOption: Dispatch<SetStateAction<string>>;
  onlyPhotoReview: boolean;
  setOnlyPhotoReview: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <View className={`flex-row gap-2 pb-4`}>
      <SortBadge
        isSortModalVisible={isSortModalVisible}
        setIsSortModalVisible={setIsSortModalVisible}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <PhotoReviewBadge
        isSelected={onlyPhotoReview}
        setIsSelected={setOnlyPhotoReview}
      />
    </View>
  );
}
