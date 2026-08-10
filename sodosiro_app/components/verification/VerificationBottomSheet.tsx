import { PinMiniIcon } from "@/assets/svgs";
import { DEFAULT_IMAGES } from "@/constants/Bingo";
import { getDistance } from "@/util/location/distance";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import * as Location from "expo-location";
import { forwardRef, useState } from "react";
import { Image, Linking, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../common/CustomButton";
import CustomText from "../common/CustomText";

type Props = {
  selectedItem: BingoItem | null;
  showToast: (text: string, duration?: number) => void;
  onClose: () => void;
};

const VerificationBottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ selectedItem, showToast, onClose }, ref) => {
    const [isLoading, setIsLoading] = useState(false);

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

        const distance = getDistance(
          latitude,
          longitude,
          selectedItem.latlng.lat,
          selectedItem.latlng.lng,
        );

        onClose();

        setTimeout(() => {
          if (distance <= 300) {
            showToast("방문이 인증되었어요!");
          } else {
            showToast("300m 이내에서 인증할 수 있어요.");
          }
        }, 300);
      } catch {
        showToast("현재 위치를 확인할 수 없어요.");
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <BottomSheetModal
        ref={ref}
        enablePanDownToClose
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            pressBehavior="close"
          />
        )}
      >
        <BottomSheetView style={{ flex: 1, gap: 16, padding: 20 }}>
          {selectedItem && (
            <SafeAreaView edges={["bottom"]} style={{ flex: 1, gap: 16 }}>
              <View className={`flex-row gap-3 items-center`}>
                <Image
                  source={
                    selectedItem.imageSource
                      ? { uri: selectedItem.imageSource }
                      : DEFAULT_IMAGES[selectedItem.category]
                  }
                  className={`w-25 h-25 rounded-xl`}
                />
                <View className={`gap-1`}>
                  <View className={`flex-row gap-1`}>
                    <PinMiniIcon color={"#7E9432"} />
                    <CustomText font="title" className={`text-primary-dark`}>
                      {selectedItem.title}
                    </CustomText>
                  </View>
                  <CustomText font="heading2">도착하셨나요?</CustomText>
                </View>
              </View>
              <CustomText font="body1" className={`text-text-secondary`}>
                현재 위치를 확인하여 방문을 인증할게요.
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
              <View className={`flex-row gap-1`}>
                <CustomButton
                  type="tertiary"
                  size="medium"
                  title="취소하기"
                  stretch
                  onPress={() => onClose()}
                />
                <CustomButton
                  type="primary"
                  size="medium"
                  title="방문 인증하기"
                  stretch
                  onPress={handleLocaion}
                  loading={isLoading}
                />
              </View>
            </SafeAreaView>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default VerificationBottomSheet;
