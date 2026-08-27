import Header from "@/components/common/Header";
import Spinner from "@/components/common/Spinner";
import CompletedTripSection from "@/components/trip/section/CompletedTripSection";
import OngoingTripSection from "@/components/trip/section/OngoingTripSection";
import UpcomingTripSection from "@/components/trip/section/UpcomingTripSection";
import TripTabBar from "@/components/trip/TripTabBar";
import { COURSE_STATE } from "@/constants/Trip";
import { useCoursesQuery } from "@/hooks/query/course";
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
    refetch: upcomingRefetch,
  } = useCoursesQuery(COURSE_STATE.UPCOMING);

  const {
    data: ongoingCourses,
    isPending: isOngoingPending,
    isError: isOngoingError,
    refetch: ongoingRefetch,
  } = useCoursesQuery(COURSE_STATE.IN_PROGRESS);

  const {
    data: completedCourses,
    isPending: isCompletedPending,
    isError: isCompletedError,
    refetch: completedRefetch,
  } = useCoursesQuery(COURSE_STATE.FINISHED);

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "white" }}>
      <Header title="내 여행" showBackButton={false} />
      <TripTabBar
        currentTab={currentTab}
        moveToSection={setCurrentTab}
        counts={{
          upcoming: Number(upcomingCourses?.data.courses?.length || 0),
          completed: Number(completedCourses?.data.courses?.length || 0),
        }}
      />
      {isOngoingPending ? (
        <View className={`flex-1 justify-center items-center`}>
          <Spinner />
        </View>
      ) : (
        <View className="flex-1">
          <View
            style={{
              display: currentTab === "예정" ? "flex" : "none",
              flex: 1,
            }}
          >
            <UpcomingTripSection
              courses={upcomingCourses?.data.courses}
              isPending={isUpcomingPending}
              isError={isUpcomingError}
              refetch={upcomingRefetch}
            />
          </View>

          <View
            style={{
              display: currentTab === "진행 중" ? "flex" : "none",
              flex: 1,
            }}
          >
            <OngoingTripSection
              courses={ongoingCourses?.data.courses}
              isPending={isOngoingPending}
              isError={isOngoingError}
              refetch={ongoingRefetch}
            />
          </View>

          <View
            style={{
              display: currentTab === "완료" ? "flex" : "none",
              flex: 1,
            }}
          >
            <CompletedTripSection
              courses={completedCourses?.data.courses}
              isPending={isCompletedPending}
              isError={isCompletedError}
              refetch={completedRefetch}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
