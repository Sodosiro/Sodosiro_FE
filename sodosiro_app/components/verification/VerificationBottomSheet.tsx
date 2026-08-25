import { PinMiniIcon } from "@/assets/svgs";
import { DEFAULT_IMAGES } from "@/constants/Category";
import { useBingoGpsMutation } from "@/hooks/mutation/bingo";
import { NumberToCategory } from "@/util/place/category";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import axios from "axios";
import * as Location from "expo-location";
import { forwardRef, useEffect, useState } from "react";
import { BackHandler, Image, Linking, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedButton from "../common/animated/AnimatedButton";
import CustomText from "../common/CustomText";
import Spinner from "../common/Spinner";

type Props = {
  selectedItem: BingoItem | null;
  showToast: (text: string, duration?: number) => void;
  onClose: () => void;
  bingoStatus?: BingoStatus;
};

const VerificationBottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ selectedItem, showToast, onClose, bingoStatus }, ref) => {
    const [isLoading, setIsLoading] = useState(false);

    const { mutateAsync } = useBingoGpsMutation();

    const gpsDisabled = bingoStatus === "ENDED";

    const handleLocaion = async () => {
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
          accuracy: Location.Accuracy.High,
        });

        const { latitude, longitude } = location.coords;

        await mutateAsync({
          contentId: selectedItem.contentId,
          latitude,
          longitude,
        });
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
      if (!isLoading) return;

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          return true;
        },
      );

      return () => subscription.remove();
    }, [isLoading]);

    return (
      <BottomSheetModal
        ref={ref}
        enablePanDownToClose={!isLoading}
        handleIndicatorStyle={{
          backgroundColor: "#E6E6E6",
          width: 50,
          height: 5,
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
                  source={
                    selectedItem.firstImage
                      ? { uri: selectedItem.firstImage }
                      : DEFAULT_IMAGES[NumberToCategory[selectedItem.category]]
                  }
                  className={`w-25 h-25 rounded-xl`}
                />
                <View className={`gap-1`}>
                  <View className={`flex-row gap-1 items-center`}>
                    <PinMiniIcon color={"#7E9432"} />
                    <CustomText font="title" className={`text-primary-dark`}>
                      {selectedItem.title}
                    </CustomText>
                  </View>
                  <CustomText font="heading2">도착하셨나요?</CustomText>
                </View>
              </View>
              <CustomText
                font="body3"
                className={`${gpsDisabled ? `text-text-muted` : `text-text-secondary`} px-1`}
              >
                {gpsDisabled
                  ? `지난 시즌의 빙고에요.`
                  : `현재 위치를 확인하여 방문을 인증할게요.`}
              </CustomText>
              <View className={`p-4 gap-2 rounded-xl bg-primary-light`}>
                <CustomText
                  font="body2 tight"
                  className={`text-text-secondary`}
                >
                  방문을 인증하면
                </CustomText>
                <View className={`gap-1.5`}>
                  <CustomText
                    font="body2 tight"
                    className={`text-text-secondary`}
                  >
                    • 빙고를 한 칸 채울 수 있어요.
                  </CustomText>
                  <CustomText
                    font="body2 tight"
                    className={`text-text-secondary`}
                  >
                    • 방문 기록이 남겨져요.
                  </CustomText>
                </View>
              </View>
              <View className={`flex-row gap-2`}>
                <AnimatedButton
                  backgroundColor={["#F5F5F5", "#E2E2E8"]}
                  className={`h-13 flex-1 rounded-xl justify-center items-center`}
                  onPress={() => {
                    if (isLoading) return;
                    onClose();
                  }}
                >
                  <CustomText font="body3 tight">취소하기</CustomText>
                </AnimatedButton>
                <AnimatedButton
                  backgroundColor={["#C4D96A", "#A9C92D"]}
                  className={`h-13 flex-1 rounded-xl justify-center items-center`}
                  onPress={handleLocaion}
                  disabled={gpsDisabled}
                  disabledColor="#f5f5f5"
                  loading={isLoading}
                >
                  {isLoading ? (
                    <Spinner size={16} />
                  ) : (
                    <CustomText
                      font="body3 tight"
                      className={`${gpsDisabled && `text-text-muted`}`}
                    >
                      방문 인증하기
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
