import { RemoveIcon, SearchIcon } from "@/assets/svgs";
import { Pressable } from "react-native";
import CustomText from "../../common/CustomText";
import { router } from "expo-router";

export default function SearchBar({ keyword }: { keyword?: string }) {
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
        className={`${keyword ? `text-text-primary` : `text-text-secondary`} flex-1 h-5`}
      >
        {keyword?.trim() ? keyword : "가고 싶은 여행지를 검색해보세요"}
      </CustomText>
      {keyword ? (
        <RemoveIcon
          color={"#888888"}
          onPress={() => {
            router.replace("/(tabs)/explore");
            router.push("/explore/search");
          }}
        />
      ) : (
        <SearchIcon color={"#888888"} />
      )}
    </Pressable>
  );
}
