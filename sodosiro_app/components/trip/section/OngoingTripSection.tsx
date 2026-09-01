import { CourseSummaryItem } from "@/api/course";
import Spinner from "@/components/common/Spinner";
import { COURSE_STATE } from "@/constants/Trip";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";
import { ScrollView, View } from "react-native";
import EmptyState from "../../common/EmptyState";
import TripCard from "../TripCard";

type CompletedTripSectionProps = {
  courses: CourseSummaryItem[] | undefined;
  isPending: boolean;
  isError: boolean;
  refetch: () => {};
};

export default function CompletedTripSection({
  courses,
  isPending,
  isError,
  refetch,
}: CompletedTripSectionProps) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // 다른 페이지 이동 시 바텀시트 모달 자동 닫기
  useFocusEffect(
    useCallback(() => {
      return () => {
        bottomSheetRef.current?.dismiss();
      };
    }, []),
  );

  // 버튼 클릭 핸들러
  const handleCardPress = (course: CourseSummaryItem) => {
    router.push({
      pathname: "/trip/timeline",
      params: {
        courseId: course.courseId,
        courseStatus: COURSE_STATE.IN_PROGRESS,
      },
    });
  };

  // 1. 로딩 상태 처리
  if (isPending) {
    return (
      <View className={`flex-1 justify-center items-center`}>
        <Spinner />
      </View>
    );
  }

  // 2. 에러 상태 처리
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
                  courseStatus={COURSE_STATE.IN_PROGRESS}
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
