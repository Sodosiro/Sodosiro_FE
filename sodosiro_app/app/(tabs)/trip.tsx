import Header from "@/components/common/Header";
import CompletedTripSection from "@/components/trip/section/CompletedTripSection";
import OngoingTripSection from "@/components/trip/section/OngoingTripSection";
import UpcomingTripSection from "@/components/trip/section/UpcomingTripSection";
import TripTabBar from "@/components/trip/TripTabBar";
import { useMyCoursesQuery } from "@/hooks/query/useCourseQuery";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TabType = "예정" | "진행 중" | "완료";

export default function TripScreen() {
  const [currentTab, setCurrentTab] = useState<TabType>("진행 중");

  const {
    data: upcomingCourses,
    isPending: isUpcomingPending,
    isError: isUpcomingError,
  } = useMyCoursesQuery({ status: "UPCOMING" });

  const {
    data: ongoingCourses,
    isPending: isOngoingPending,
    isError: isOngoingError,
  } = useMyCoursesQuery({ status: "IN_PROGRESS" });

  const {
    data: completedCourses,
    isPending: isCompletedPending,
    isError: isCompletedError,
  } = useMyCoursesQuery({ status: "FINISHED" });

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "white" }}>
      <Header title="내 여행" showBackButton={false} />
      <TripTabBar
        currentTab={currentTab}
        moveToSection={setCurrentTab}
        counts={{
          upcoming: Number(upcomingCourses?.data.courses?.length),
          completed: Number(completedCourses?.data.courses?.length),
        }}
      />

      <View className="flex-1">
        <View style={{ display: currentTab === "예정" ? "flex" : "none", flex: 1 }}>
          <UpcomingTripSection
            courses={upcomingCourses?.data.courses}
            isPending={isUpcomingPending}
            isError={isUpcomingError}
          />
        </View>

        <View
          style={{
            display: currentTab === "진행 중" ? "flex" : "none",
            flex: 1,
          }}
        >
          <OngoingTripSection />
        </View>

        <View style={{ display: currentTab === "완료" ? "flex" : "none", flex: 1 }}>
          <CompletedTripSection />
        </View>
      </View>
    </SafeAreaView>
  );
}
