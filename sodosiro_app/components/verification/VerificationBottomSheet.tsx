import { PinMiniIcon } from "@/assets/svgs";
import { DEFAULT_IMAGES } from "@/constants/Category";
import { useToast } from "@/contexts/ToastProvider";
import { useBingoGpsMutation } from "@/hooks/mutation/bingo";
import { useCourseGpsMutation } from "@/hooks/mutation/course";
import { getDistanceInMeters } from "@/util/location/location";
import { NumberToCategory } from "@/util/place/category";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import axios from "axios";
import * as Location from "expo-location";
import { router } from "expo-router";
import { forwardRef, useEffect, useState } from "react";
import { BackHandler, Image, Linking, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedButton from "../common/animated/AnimatedButton";
import CustomText from "../common/CustomText";
import Spinner from "../common/Spinner";

type Props = {
  selectedItem: GpsVerificationItem | null;
  onClose: () => void;
  bingoStatus?: BingoStatus;
};

const VerificationBottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ selectedItem, onClose, bingoStatus }, ref) => {
    const { showToast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { mutateAsync: bingoMutateAsync } = useBingoGpsMutation();
    const { mutateAsync: courseMutateAsync } = useCourseGpsMutation();

    const isSeasonEnded = bingoStatus === "ENDED";
    const isCompleted = selectedItem?.completed;

    const imageSource = selectedItem?.firstImage
      ? { uri: selectedItem.firstImage }
      : DEFAULT_IMAGES[
          NumberToCategory[selectedItem?.category as CategoryNumber]
        ];

    const advantages = bingoStatus
      ? ["빙고를 한 칸 채울 수 있어요.", "방문 기록이 남겨져요."]
      : [
          "리뷰에 방문 인증 표시가 붙어요.",
          "내가 쓴 피드에 방문 인증 표시가 붙어요.",
        ];

    const handleVerification = async () => {
      if (!selectedItem) return;

      try {
        setIsLoading(true);

        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          onClose();
          Linking.openSettings();
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        const { latitude, longitude } = location.coords;

        const distance = getDistanceInMeters(
          latitude,
          longitude,
          selectedItem.latitude,
          selectedItem.longitude,
        );

        if (distance > 300) {
          showToast("300m 이내에서 인증할 수 있어요.");
          return;
        }

        if (bingoStatus) {
          await bingoMutateAsync({
            contentId: selectedItem.contentId,
          });
          showToast("방문이 인증되었어요!.");
        } else {
          await courseMutateAsync({
            courseId: selectedItem.courseId as number,
            contentId: selectedItem.contentId,
            day: selectedItem.day as number,
          });
          showToast("방문이 인증되었어요!.");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.data?.code === "GPS409-OUT_OF_RANGE") {
            showToast("300m 이내에서 인증할 수 있어요.");
          } else {
            showToast("위치 인증 중 오류가 발생했어요.");
          }
        }
      } finally {
        onClose();
        setIsLoading(false);
      }
    };

    useEffect(() => {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          // 로딩 중이면 뒤로가기 무시
          if (isLoading) {
            return true;
          }

          // 모달이 열려 있으면 닫기
          if (isModalOpen) {
            onClose();
            return true;
          }

          // 모달이 닫혀 있으면 다른 화면의 뒤로가기 처리
          return false;
        },
      );

      return () => subscription.remove();
    }, [isLoading, isModalOpen, onClose]);

    return (
      <BottomSheetModal
        ref={ref}
        enablePanDownToClose={!isLoading}
        handleIndicatorStyle={{
          backgroundColor: "#E6E6E6",
          width: 50,
          height: 5,
        }}
        onChange={(index) => {
          setIsModalOpen(index >= 0);
        }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            pressBehavior={isLoading ? "none" : "close"}
          />
        )}
      >
        <BottomSheetView style={{ flex: 1, gap: 16, padding: 20 }}>
          {selectedItem && (
            <SafeAreaView edges={["bottom"]} style={{ flex: 1, gap: 16 }}>
              <View className={`flex-row gap-3 items-center`}>
                <Image
                  source={imageSource}
                  className={`w-25 h-25 rounded-xl`}
                />
                <View className={`gap-1`}>
                  <View className={`flex-row gap-1 items-center`}>
                    <PinMiniIcon color={"#7E9432"} />
                    <CustomText font="title" className={`text-primary-dark`}>
                      {selectedItem.title}
                    </CustomText>
                  </View>
                  <CustomText
                    font="heading2"
                    className={`${isSeasonEnded && !isCompleted && `text-text-muted`}`}
                  >
                    {isCompleted
                      ? `인증 완료`
                      : isSeasonEnded
                        ? `미인증`
                        : `도착하셨나요?`}
                  </CustomText>
                </View>
              </View>
              <CustomText
                font="body3"
                className={`${isSeasonEnded ? `text-text-muted` : `text-text-secondary`} px-1`}
              >
                {isSeasonEnded
                  ? `방문 인증이 종료된 빙고에요.`
                  : isCompleted
                    ? `방문이 인증되었어요.`
                    : `현재 위치를 확인하여 방문을 인증할게요.`}
              </CustomText>
              {!isSeasonEnded && (
                <View className={`p-4 gap-2 rounded-xl bg-primary-light`}>
                  <CustomText
                    font="body2 tight"
                    className={`text-text-secondary`}
                  >
                    방문을 인증하면
                  </CustomText>
                  <View className={`gap-1.5`}>
                    {advantages.map((advantage, index) => (
                      <CustomText
                        key={index}
                        font="body2 tight"
                        className={`text-text-secondary`}
                      >
                        • {advantage}
                      </CustomText>
                    ))}
                  </View>
                </View>
              )}
              <View className={`flex-row gap-2`}>
                <AnimatedButton
                  backgroundColor={["#F5F5F5", "#E2E2E8"]}
                  className={`h-13 flex-1 rounded-xl justify-center items-center`}
                  onPress={() => {
                    if (isLoading) return;
                    onClose();
                  }}
                >
                  <CustomText font="body3 tight">취소</CustomText>
                </AnimatedButton>
                <AnimatedButton
                  backgroundColor={["#C4D96A", "#A9C92D"]}
                  className={`h-13 flex-1 rounded-xl justify-center items-center`}
                  onPress={
                    !isCompleted && !isSeasonEnded
                      ? handleVerification
                      : () => {
                          onClose();
                          router.push({
                            pathname: "/place/[placeId]",
                            params: { placeId: selectedItem.contentId },
                          });
                        }
                  }
                  loading={isLoading}
                >
                  {isLoading ? (
                    <Spinner size={16} />
                  ) : (
                    <CustomText font="body3 tight">
                      {isCompleted || isSeasonEnded
                        ? `장소 상세보기`
                        : `방문 인증하기`}
                    </CustomText>
                  )}
                </AnimatedButton>
              </View>
            </SafeAreaView>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default VerificationBottomSheet;
