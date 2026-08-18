import { View } from "react-native";
import CustomText from "../../common/CustomText";

const POPULAR_COLOR = "#FF7681";
const LIKED_COLOR = "#F8CF43";

const List = [
  {
    color: POPULAR_COLOR,
    title: "인기 지역",
  },
  {
    color: LIKED_COLOR,
    title: "좋아요 한 장소",
  },
];

export default function PlaceLegend({ className }: { className?: string }) {
  return (
    <View
      className={`${className} bg-white px-3 py-2.5 gap-2 rounded-xl self-start border border-border`}
    >
      {List.map((item, index) => (
        <View key={index} className={`flex-row gap-2 items-center`}>
          <View
            className={`w-5 h-5 rounded-full`}
            style={{ backgroundColor: item.color }}
          ></View>
          <CustomText font="body3">{item.title}</CustomText>
        </View>
      ))}
    </View>
  );
}
