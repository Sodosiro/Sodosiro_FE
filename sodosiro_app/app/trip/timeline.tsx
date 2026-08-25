import {
  CourseDayItem,
  CourseDetailResponse,
  SpotItem,
  updateCourseDaysApi,
} from "@/api/course";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import CustomText from "@/components/common/CustomText";
import DimmedLoading from "@/components/common/DimmedLoading";
import Header from "@/components/common/Header";
import Spinner from "@/components/common/Spinner";
import TimelineExportFooter from "@/components/common/trip/TimelineExportFooter";
import KakaoMap from "@/components/explore/KakaoMap";
import TimelineDayBadgeSection from "@/components/timeline/section/TimelineDayBadgeSection";
import TimelineDaySection from "@/components/timeline/section/TimelineDaySection";
import TripPlanConfirmModal from "@/components/timeline/TripPlanConfirmModal";
import { useToast } from "@/contexts/ToastProvider";
import { useConfirmCourseMutation } from "@/hooks/query/useCourseMutation";
import { useCourseDetailQuery } from "@/hooks/query/useCourseQuery";
import { useTimelineScrollSpy } from "@/hooks/useTimelineScrollSpy";
import { formatCoursePeriod } from "@/util/date/date";
import { createRouteInfo } from "@/util/route/route";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WebView from "react-native-webview";

export default function TimelineScreen() {
  const { courseId, isConfirmed } = useLocalSearchParams<{
    courseId: string;
    isConfirmed: string;
  }>();
  const isCourseConfirmed = isConfirmed === "true";

  const {
    data: courseResponse,
    isPending,
    isError,
  } = useCourseDetailQuery(courseId);
  const { mutate: confirmCourse, isPending: isConfirmPending } =
    useConfirmCourseMutation();
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const { showToast } = useToast();

  // 1. 모든 Hook 및 State는 조건문(Early Return)보다 항상 위에 선언되어야 합니다.
  const [tripTitle, setTripTitle] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const {
    activeIndex,
    setActiveIndex,
    mainScrollRef,
    badgeScrollRef,
    moveToSection,
    handleScroll,
    handleBadgeLayout,
    handleBadgeContainerLayout,
    getSectionLayoutHandler,
  } = useTimelineScrollSpy();

  const [isEditing, setIsEditing] = useState(false);
  const [onDrag, setOnDrag] = useState(false);
  const insets = useSafeAreaInsets();

  const [plan, setPlan] = useState<CourseDayItem[]>([]);
  const [temp, setTemp] = useState<CourseDayItem[]>([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isPatchPending, setIsPatchPending] = useState(false);
  const [selectedSpotIndexes, setSelectedSpotIndexes] = useState<
    Record<number, number>
  >({});
  const selectedSpotIndex = selectedSpotIndexes[activeIndex] ?? 0;

  // 2. API 데이터 수신 완료 시 state에 안전하게 세팅
  useEffect(() => {
    if (courseResponse?.data) {
      const courseDetail: CourseDetailResponse = courseResponse.data;
      if (courseDetail.title) setTripTitle(courseDetail.title);
      if (courseDetail.days) {
        setPlan(courseDetail.days);
        setTemp(courseDetail.days);
      }
    }
  }, [courseResponse]);

  const routeInfo = useMemo(() => {
    if (!courseResponse?.data) {
      return null;
    }

    return createRouteInfo(courseResponse.data, activeIndex, selectedSpotIndex);
  }, [courseResponse, activeIndex, selectedSpotIndex]);

  const handleSaveCourseDays = async (daysOverride?: CourseDayItem[]) => {
    const daysToSave = daysOverride ?? temp;

    setIsPatchPending(true);
    setIsEditing(false);
    setIsConfirmOpen(false);
    try {
      const requestBody = {
        days: daysToSave.map((item) => ({
          day: item.day,
          contentIds: item.spots
            ? item.spots.map((spot) => spot.contentId)
            : [],
        })),
      };

      await updateCourseDaysApi(courseId, requestBody);

      await queryClient.invalidateQueries({
        queryKey: ["courseDetail", courseId],
      });
    } catch (error: any) {
      console.log("코스 일차 수정 에러:", error);
    } finally {
      setIsPatchPending(false);
    }
  };

  const handlePlaceChanged = useCallback(
    ({
      dayDate,
      changeTargetId,
      changedPlace,
    }: {
      dayDate: string;
      changeTargetId: number;
      changedPlace: SpotItem;
    }) => {
      const updatedTemp = temp.map((day) =>
        day.date === dayDate
          ? {
              ...day,
              spots: day.spots.map((place) =>
                place.contentId === changeTargetId
                  ? { ...place, ...changedPlace }
                  : place,
              ),
            }
          : day,
      );

      setTemp(updatedTemp);
      handleSaveCourseDays(updatedTemp);
    },
    [temp],
  );

  const handleConfirmOpen = useCallback(() => {
    if (plan === temp) setIsEditing(false);
    else setIsConfirmOpen(true);
  }, [plan, temp]);

  const badgeOrder = useMemo(() => temp.map((_, index) => index + 1), [temp]);

  const handleConfirmCourse = () => {
    confirmCourse(
      { courseId: Number(courseId) },
      {
        onSuccess: () => {
          showToast("코스가 확정되었습니다.");
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        },
        onError: (error: any) => {
          console.error("코스 확정 에러:", error);
        },
      },
    );
  };

  const webViewRef = useRef<React.ComponentRef<typeof WebView>>(null);

  const screenWidth = Dimensions.get("window").width;
  const animatedPosition = useSharedValue((screenWidth * 2) / 3);

  // 3. Early Return(로딩 및 예외 처리)은 모든 Hook 선언이 완료된 바로 이 위치에서 수행합니다.
  if (isPending || !courseResponse?.data) {
    return (
      <View className={`flex-1 justify-center items-center`}>
        <Spinner />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <Header
        title={tripTitle}
        showPencil={!isCourseConfirmed}
        onTitleChange={(newTitle) => setTripTitle(newTitle)}
      />

      {/* 확정 코스 여부에 따라 렌더링 결정 */}
      {isCourseConfirmed && (
        <View className={`w-full aspect-3/2 overflow-hidden`}>
          <KakaoMap
            webViewRef={webViewRef}
            mode={"navigation"}
            routeData={routeInfo}
            animatedPosition={animatedPosition}
          />
        </View>
      )}

      <View className="flex-1">
        <TimelineDayBadgeSection
          badgeOrder={badgeOrder}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          showEditButton={!isCourseConfirmed}
          setPlan={setTemp}
          onPressDayBadge={moveToSection}
          handleConfirmOpen={handleConfirmOpen}
          onLayoutDayBadge={handleBadgeLayout}
          onBadgeContainerLayout={handleBadgeContainerLayout}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          badgeScrollRef={badgeScrollRef}
        />

        {isEditing && (
          <View className="pl-7 pb-1">
            <CustomText font="body3" className="min-w-5 text-text-muted">
              끌어서 장소의 순서를 변경해보세요.
            </CustomText>
          </View>
        )}

        <ScrollView
          className="flex-1"
          ref={mainScrollRef}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
          scrollEnabled={!onDrag}
          onScroll={handleScroll}
          scrollEventThrottle={32}
          showsVerticalScrollIndicator={false}
        >
          {temp.map((item, index) => (
            <TimelineDaySection
              key={item.day}
              setOnDrag={setOnDrag}
              dayPlan={item}
              mode={"isUpcoming"}
              isCourseConfirmed={isCourseConfirmed}
              isEditing={isEditing}
              dayIndex={index}
              setPlan={setTemp}
              onLayout={getSectionLayoutHandler(index)}
              onPlaceChanged={handlePlaceChanged}
              onRouteSpotChange={(spotIndex) => {
                setSelectedSpotIndexes((prev) => ({
                  ...prev,
                  [index]: spotIndex,
                }));
              }}
            />
          ))}
        </ScrollView>

        {!isCourseConfirmed && (
          <TimelineExportFooter
            isEditing={isEditing}
            onConfirm={() => {
              setModalVisible(true);
            }}
          />
        )}
      </View>

      <ConfirmDialog
        visible={isConfirmOpen}
        title="이 일정을 저장할까요?"
        cancelText="취소"
        confirmText="저장하기"
        onClose={() => {
          setTemp(plan);
          setIsEditing(false);
          setIsConfirmOpen(false);
        }}
        onConfirm={() => handleSaveCourseDays()}
      />
      <TripPlanConfirmModal
        title={tripTitle}
        dateRange={formatCoursePeriod(temp)}
        plan={plan}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={(selectedDay) => {
          setModalVisible(false);
          handleConfirmCourse();
        }}
      />
      {/* 로딩 딤(Dim) 레이어 Modal */}
      <DimmedLoading visible={isPatchPending || isConfirmPending} />
    </View>
  );
}
