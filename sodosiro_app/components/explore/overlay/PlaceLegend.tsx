import { View } from "react-native";
import CustomText from "../../common/CustomText";

const List = [
  {
    color: "#6AD9CA",
    title: "인기 지역",
  },
  {
    color: "#ECB76E",
    title: "즐겨 찾기",
  },
];

export default function PlaceLegend({ className }: { className?: string }) {
  return (
    <View
      className={`${className} bg-white px-3 py-2.5 gap-2 rounded-xl self-start border border-border`}
    >
      {List.map((item, index) => (
        <View key={index} className={`flex-row gap-2`}>
          <View
            className={`w-5 h-5 rounded-full`}
            style={{ backgroundColor: item.color }}
          ></View>
          <CustomText className={`text-body3`}>{item.title}</CustomText>
        </View>
      ))}
    </View>
  );
}
