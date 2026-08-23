import CustomText from "@/components/common/CustomText";
import { GANGWON_MAP } from "@/constants/GangwonMap";
import { useFocusEffect } from "expo-router";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { View } from "react-native";
import Svg from "react-native-svg";
import GangwonMapItem from "./GangwonMapItem";
import RegionTag from "./RegionTag";

interface GangwonMapProps {
  visitedRegionIds: number[];
  width?: number | string;
  selectedRegionId: number | null;
  setSelectedRegionId: Dispatch<SetStateAction<number | null>>;
}

const VISIT_LEGEND = [
  { title: "방문 완료", color: "#A9C92D" },
  { title: "미방문", color: "#EDEDED" },
];

export default function GangwonMap({
  visitedRegionIds = [],
  width = "100%",
  selectedRegionId,
  setSelectedRegionId,
}: GangwonMapProps) {
  // 실제 화면에 렌더링된 지도 크기
  const [mapSize, setMapSize] = useState({
    width: 0,
    height: 0,
  });

  // 선택된 지역 데이터
  const selected = GANGWON_MAP.find(
    (region) => region.sigunguId === selectedRegionId,
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        setSelectedRegionId(null);
      };
    }, []),
  );

  return (
    <View className={`px-9 py-2`}>
      <View className={`relative w-full items-center gap-4`}>
        <View
          onLayout={(event) => {
            const { width, height } = event.nativeEvent.layout;
            setMapSize({
              width,
              height,
            });
          }}
        >
          <Svg
            width={width}
            viewBox="0 0 800 699"
            style={{
              userSelect: "none",
              aspectRatio: 800 / 699,
            }}
          >
            {GANGWON_MAP.map((region) => (
              <GangwonMapItem
                key={region.sigunguId}
                id={region.sigunguId}
                x={region.x}
                y={region.y}
                d={region.d}
                isVisited={visitedRegionIds.includes(region.sigunguId)}
                onPress={() => {
                  setSelectedRegionId(region.sigunguId);
                }}
              />
            ))}
          </Svg>
        </View>

        {selected && mapSize.width > 0 && (
          <RegionTag
            animateKey={String(selected.sigunguId)}
            x={selected.x}
            y={selected.y}
            name={selected.name}
            mapSize={mapSize}
          />
        )}

        <VisitLegend />
      </View>
    </View>
  );
}

const VisitLegend = () => {
  return (
    <View className={`flex-row gap-6`}>
      {VISIT_LEGEND.map((item) => (
        <View key={item.title} className={`flex-row gap-2`}>
          <View
            className={`size-4 rounded-sm`}
            style={{ backgroundColor: item.color }}
          />
          <CustomText font="body3" className={`text-text-muted`}>
            {item.title}
          </CustomText>
        </View>
      ))}
    </View>
  );
};
