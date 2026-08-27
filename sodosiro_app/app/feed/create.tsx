import { postFeedApi } from "@/api/feed";
import CustomButton from "@/components/common/CustomButton";
import CustomText from "@/components/common/CustomText";
import DimmedLoading from "@/components/common/DimmedLoading";
import Header from "@/components/common/Header";
import CreateFeedStepContent from "@/components/feed/create/step/CreateFeedStepContent";
import CreateFeedStepHistory from "@/components/feed/create/step/CreateFeedStepHistory";
import CreateFeedStepPlace from "@/components/feed/create/step/CreateFeedStepPlace";
import { COURSE_STATE } from "@/constants/Trip";
import { useCoursePlacesQuery, useCoursesQuery } from "@/hooks/query/course";
import { invalidateQueries } from "@/util/query/invalidateQueries";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { BackHandler, useWindowDimensions, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const STEP_COUNT = 3;

export default function CreateFeedScreen() {
  const { width } = useWindowDimensions();

  const { courseId } = useLocalSearchParams<{ courseId?: string }>();
  const paramCourseId = courseId ? Number(courseId) : undefined;

  const initialStep = paramCourseId ? 1 : 0;
  const [step, setStep] = useState(initialStep);
  const [selectedCourseId, setSelectedCourseId] = useState<number | undefined>(
    paramCourseId,
  );

  const [selectedPlace, setSelectedPlace] = useState<TripSpotType | null>(null);
  const [text, setText] = useState("");
  const [imageSources, setImageSources] = useState<
    ImagePicker.ImagePickerAsset[]
  >([]);
  const [isPicking, setIsPicking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const translateX = useSharedValue(-width * initialStep);

  const contentStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const { data: coursesData, isPending: isCoursesPending } = useCoursesQuery(
    COURSE_STATE.FINISHED,
  );
  const courses = coursesData?.data.courses;

  const { data: coursePlacesData, isPending: isPlacesPending } =
    useCoursePlacesQuery(selectedCourseId);
  const places = coursePlacesData?.data.spots;

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (paramCourseId && selectedCourseId !== paramCourseId) {
      setSelectedCourseId(paramCourseId);
      setStep(1);
      translateX.value = -width;
    }
  }, [paramCourseId, width]);

  const moveToStep = (nextStep: number) => {
    setStep(nextStep);

    translateX.value = withTiming(-width * nextStep, {
      duration: 300,
    });
  };

  const handleNext = () => {
    if (step >= STEP_COUNT - 1) {
      handleSubmit();
      return;
    }
    moveToStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) {
      if (step === 1 && paramCourseId) {
        router.back();
        return;
      }

      const prevStep = step - 1;

      if (prevStep < 1) {
        setSelectedPlace(null);
      } else if (prevStep < 2) {
        setImageSources([]);
        setText("");
      }

      moveToStep(prevStep);
      return;
    }

    router.back();
  };

  const handleSubmit = async () => {
    if (
      text.trim() === "" ||
      isSubmitting ||
      isPicking ||
      imageSources?.length === 0 ||
      !selectedPlace
    ) {
      return;
    }
    try {
      setIsSubmitting(true);

      await postFeedApi(
        Number(selectedCourseId),
        selectedPlace?.contentId,
        text.trim(),
        imageSources,
      );

      await invalidateQueries([["feeds"]]);

      router.push("/(tabs)/feed");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("status:", error.response?.status);
        console.log("data:", error.response?.data);
      }
      console.error("[postReviewApi] 피드 작성 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (isSubmitting) return true;
        if (step > 0) {
          handleBack();
          return true;
        }
        return false;
      },
    );
    return () => {
      subscription.remove();
    };
  }, [step, width, isSubmitting, paramCourseId]);

  const isNextDisabled =
    step === 0
      ? !selectedCourseId
      : step === 1
        ? !selectedPlace
        : step === 2
          ? text.trim() === "" || imageSources?.length < 1 || isPicking
          : false;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Header title="발견 피드 작성하기" handleBack={handleBack} />

      {courses?.length < 1 ? (
        <View className="flex-1 gap-8 justify-center items-center">
          <View className="gap-3 items-center">
            <CustomText font="heading2">아직 완료한 여행이 없어요.</CustomText>
            <CustomText font="body3" className="text-text-muted">
              여행을 마치면 방문한 장소로{"\n"}발견 카드를 남길 수 있어요.
            </CustomText>
          </View>
          <View>
            <CustomButton
              type="primary"
              size="small"
              title="진행 중인 여행 보기"
            />
          </View>
        </View>
      ) : (
        <>
          <View className="flex-1 overflow-hidden">
            <Animated.View
              className="flex-row flex-1"
              style={[
                {
                  width: width * STEP_COUNT,
                },
                contentStyle,
              ]}
            >
              {/* Step 1 */}
              <View style={{ width }}>
                <CreateFeedStepHistory
                  courses={courses}
                  selectedCourseId={selectedCourseId}
                  setSelectedCourseId={setSelectedCourseId}
                  isPending={isCoursesPending}
                />
              </View>

              {/* Step 2 */}
              <View style={{ width }}>
                <CreateFeedStepPlace
                  places={places}
                  selectedPlace={selectedPlace}
                  setSelectedPlace={setSelectedPlace}
                  isPending={isPlacesPending}
                />
              </View>

              {/* Step 3 */}
              <View style={{ width }}>
                <CreateFeedStepContent
                  selectedPlace={selectedPlace}
                  text={text}
                  setText={setText}
                  images={imageSources}
                  setImages={setImageSources}
                  isPicking={isPicking}
                  isPending={isSubmitting}
                  setIsPicking={setIsPicking}
                />
              </View>
            </Animated.View>
          </View>

          <View className="px-5 py-3">
            <CustomButton
              type="primary"
              title={step === STEP_COUNT - 1 ? "올리기" : "다음으로"}
              disabled={isNextDisabled}
              loading={isSubmitting}
              onPress={handleNext}
            />
          </View>
        </>
      )}
      <DimmedLoading visible={isSubmitting} />
    </SafeAreaView>
  );
}
