import { NotificationIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import { FESTIVALS } from "@/mocks/places";
import { ScrollView, View } from "react-native";
import Festival from "./Festival";

export default function FestivalList() {
  return FESTIVALS.length > 0 ? (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8 }}
    >
      {FESTIVALS.map((festival) => (
        <Festival
          key={festival.id}
          id={festival.id}
          imageSource={festival.imageSource}
          region={festival.region}
          title={festival.title}
          startDate={festival.startDate}
          endDate={festival.endDate}
        />
      ))}
    </ScrollView>
  ) : (
    <View className={`rounded-xl items-center p-5 gap-3 bg-bg-subtle`}>
      <View className={`opacity-70`}>
        <NotificationIcon width={20} color={"#444444"} />
      </View>
      <CustomText font="body2" className={`text-body2 text-text-secondary`}>
        예정된 축제가 없어요
      </CustomText>
    </View>
  );
}
