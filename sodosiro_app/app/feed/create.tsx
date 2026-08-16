import CustomButton from "@/components/common/CustomButton";
import CustomText from "@/components/common/CustomText";
import Header from "@/components/common/Header";
import CreateFeedStepContent from "@/components/feed/create/step/CreateFeedStepContent";
import CreateFeedStepHistory from "@/components/feed/create/step/CreateFeedStepHistory";
import CreateFeedStepPlace from "@/components/feed/create/step/CreateFeedStepPlace";
import { TRIP_HISTORY } from "@/mocks/feed";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { BackHandler, useWindowDimensions, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const STEP_COUNT = 3;

export default function CreateFeedScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const [step, setStep] = useState(0);

  const [selectedHistoryId, setSelectedHistoryId] = useState<number | null>(
    null,
  );
  const [selectedPlace, setSelectedPlace] =
    useState<TripHistoryPlaceType | null>(null);
  const [text, setText] = useState("");
  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [isPicking, setIsPicking] = useState(false);

  const translateX = useSharedValue(0);

  const contentStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

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
      const prevStep = step - 1;

      if (prevStep < 1) {
        setSelectedPlace(null);
      } else if (prevStep < 2) {
        setImages([]);
        setText("");
      }

      moveToStep(prevStep);
      return;
    }

    router.back();
  };

  const handleSubmit = () => {
    // TODO: 피드 등록 API
  };

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
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
  }, [step, width]);

  const isNextDisabled =
    step === 0
      ? !selectedHistoryId
      : step === 1
        ? !selectedPlace
        : step === 2
          ? text.trim() === "" || images?.length < 1 || isPicking
          : false;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Header title="발견 피드 작성하기" handleBack={handleBack} />

      {TRIP_HISTORY.length < 1 ? (
        <View className={`flex-1 gap-8 justify-center items-center`}>
          <View className={`gap-3 items-center`}>
            <CustomText font="heading2">아직 완료한 여행이 없어요.</CustomText>
            <CustomText font="body3" className={`text-text-muted`}>
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
              className="flex-1 flex-row"
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
                  selectedHistoryId={selectedHistoryId}
                  setSelectedHistoryId={setSelectedHistoryId}
                />
              </View>

              {/* Step 2 */}
              <View style={{ width }}>
                <CreateFeedStepPlace
                  selectedPlace={selectedPlace}
                  setSelectedPlace={setSelectedPlace}
                />
              </View>

              {/* Step 3 */}
              <View style={{ width }}>
                <CreateFeedStepContent
                  selectedPlace={selectedPlace}
                  text={text}
                  setText={setText}
                  images={images}
                  setImages={setImages}
                  isPicking={isPicking}
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
              onPress={handleNext}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
