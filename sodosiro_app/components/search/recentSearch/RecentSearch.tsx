import { RemoveMiniIcon } from "@/assets/svgs";
import AnimatedButton from "@/components/common/animated/AnimatedButton";
import CustomText from "@/components/common/CustomText";
import { handleSearch } from "@/util/search/search";

export default function RecentSearch({
  recentSearch,
  onRemove,
}: {
  recentSearch: string;
  onRemove: (keyword: string) => void;
}) {
  return (
    <AnimatedButton
      className={`flex-row items-center gap-1 px-3 py-2 border border-border rounded-full bg-white`}
      onPress={() => handleSearch(recentSearch)}
      backgroundColor={["#FFFFFF", "#F5F5F5"]}
    >
      <CustomText font="body3 tight" className={`text-text-secondary`}>
        {recentSearch}
      </CustomText>
      <RemoveMiniIcon onPress={() => onRemove(recentSearch)} />
    </AnimatedButton>
  );
}
