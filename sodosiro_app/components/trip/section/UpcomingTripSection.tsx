import { CourseSummaryItem } from "@/api/course";
import Spinner from "@/components/common/Spinner";
import { COURSE_STATE } from "@/constants/Trip";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";
import EmptyState from "../EmptyState";
import TripCard from "../TripCard";

type UpcomingTripSectionProps = {
  courses: CourseSummaryItem[] | undefined;
  isPending: boolean;
  isError: boolean;
  refetch: () => {};
};

export default function UpcomingTripSection({
  courses,
  isPending,
  isError,
  refetch,
}: UpcomingTripSectionProps) {
  const handleCardPress = (course: CourseSummaryItem) => {
    router.push({
      pathname: "/trip/timeline",
      params: {
        courseId: course.courseId,
        courseStatus: Boolean(course.isConfirmed)
          ? COURSE_STATE.UPCOMING
          : COURSE_STATE.TEMP,
      },
    });
  };

  if (isPending) {
    return (
      <View className={`flex-1 justify-center items-center`}>
        <Spinner />
      </View>
    );
  }

  if (isError) {
    return (
      <EmptyState
        title="일정을 불러오지 못했어요."
        description="네트워크 상태를 확인하고 다시 시도해주세요."
        actionLabel="다시 시도"
        onPressAction={() => refetch()}
      />
    );
  }

  return (
    <View className="flex-1">
      {Number(courses?.length) === 0 ? (
        <EmptyState
          title="아직 여행 일정이 없어요."
          description="새로운 여행 일정을 만들까요?"
          actionLabel="새 일정 만들기"
          onPressAction={() => router.push("/roulette")}
        />
      ) : (
        <>
          <ScrollView className="flex-1">
            <View className="p-5">
              {courses?.map((course) => (
                <TripCard
                  key={course.courseId}
                  courseStatus={
                    Boolean(course.isConfirmed)
                      ? COURSE_STATE.UPCOMING
                      : COURSE_STATE.TEMP
                  }
                  course={course}
                  onPress={() => handleCardPress(course)}
                />
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
}
