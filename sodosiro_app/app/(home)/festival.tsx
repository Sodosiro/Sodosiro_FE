import AnimatedBadge from "@/components/common/AnimatedBadge";
import Header from "@/components/common/Header";
import FestivalItem from "@/components/home/festival/FestivalItem";
import { FESTIVALS } from "@/mocks/places";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Schedules = ["진행 중", "진행 예정"];

export default function FestivalPlaceScreen() {
  const [selectedSchedule, setSelectedSchedule] = useState("진행 중");

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <Header title="다가오는 강원 축제" />
      <View className={`bg-bg w-full flex-1`}>
        <View className="pb-2 relative">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="px-5 gap-1 bg-bg"
          >
            {Schedules.map((schedule) => (
              <AnimatedBadge
                key={schedule}
                title={schedule}
                isSelected={schedule === selectedSchedule}
                onPress={() => setSelectedSchedule(schedule)}
              />
            ))}
          </ScrollView>
        </View>

        <ScrollView contentContainerClassName="px-5 py-2 gap-4 bg-bg">
          {FESTIVALS.map((festival) => (
            <FestivalItem key={festival.id} festival={festival} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
