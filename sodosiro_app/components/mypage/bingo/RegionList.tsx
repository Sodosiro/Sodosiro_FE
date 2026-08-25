import AnimatedBadge from "@/components/common/animated/AnimatedBadge";
import { Dispatch, SetStateAction } from "react";
import { ScrollView, View } from "react-native";

export default function RegionList({
  regionList,
  selectedRegion,
  setSelectedRegion,
}: {
  regionList: string[];
  selectedRegion: string;
  setSelectedRegion: Dispatch<SetStateAction<string>>;
}) {
  return (
    <View className={`pb-3`}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName={`px-5 gap-1 self-start`}
      >
        {regionList.map((region, index) => (
          <AnimatedBadge
            key={index}
            title={region}
            isSelected={selectedRegion === region}
            onPress={() => setSelectedRegion(region)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
