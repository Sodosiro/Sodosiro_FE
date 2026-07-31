import { RemoveIcon, SearchIcon } from "@/assets/svgs";
import { useSearchStore } from "@/stores/useSearchStore";
import type BottomSheet from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import type { RefObject } from "react";
import { Pressable } from "react-native";
import CustomText from "../../common/CustomText";

export default function SearchBar({
  keyword,
  bottomSheetRef,
}: {
  keyword?: string;
  bottomSheetRef: RefObject<BottomSheet | null>;
}) {
  const { clearResult } = useSearchStore();
  return (
    <Pressable
      className={`flex-row justify-between items-center border border-border bg-white w-full px-6 h-15 rounded-full`}
      onPress={() => {
        router.push({
          pathname: "/explore/search",
          params: {
            keyword: keyword ?? "",
          },
        });
      }}
    >
      <CustomText
        font="body1"
        className={`${keyword ? `text-text-primary` : `text-text-secondary`} flex-1 min-h-5`}
        numberOfLines={1}
      >
        {keyword?.trim() ? keyword : "가고 싶은 여행지를 검색해보세요"}
      </CustomText>
      {keyword ? (
        <RemoveIcon
          color={"#888888"}
          onPress={() => {
            clearResult();
            router.push("/explore/search");
          }}
        />
      ) : (
        <SearchIcon color={"#888888"} />
      )}
    </Pressable>
  );
}
