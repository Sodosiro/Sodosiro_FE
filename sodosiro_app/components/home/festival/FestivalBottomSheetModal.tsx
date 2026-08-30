import AnimatedButton from "@/components/common/animated/AnimatedButton";
import CustomText from "@/components/common/CustomText";
import { getSeasonImage } from "@/util/festival/festival";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { forwardRef, useEffect } from "react";
import { BackHandler, Image, Linking, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  festival: FestivalType | null;
  onClose: () => void;
}

const FestivalBottomSheetModal = forwardRef<BottomSheetModal, Props>(
  ({ festival, onClose }, ref) => {
    const imageSource = festival?.imageUrl
      ? { uri: festival.imageUrl }
      : festival
        ? getSeasonImage(festival.startDate)
        : undefined;

    const handleOpenFestivalLink = async () => {
      if (!festival?.linkUrl) return;

      const supported = await Linking.canOpenURL(festival.linkUrl);
      if (supported) {
        await Linking.openURL(festival.linkUrl);
      }
    };

    const insets = useSafeAreaInsets();

    useEffect(() => {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          // 모달이 열려있을 때만 뒤로가기를 가로챔
          if (festival) {
            (ref as React.RefObject<BottomSheetModal>)?.current?.dismiss();
            return true;
          }

          return false;
        },
      );

      return () => subscription.remove();
    }, [festival, ref]);

    return (
      <BottomSheetModal
        ref={ref}
        enablePanDownToClose
        onDismiss={onClose}
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
            opacity={0.5}
            pressBehavior="close"
          />
        )}
      >
        {festival && imageSource && (
          <BottomSheetScrollView
            contentContainerStyle={{
              padding: 20,
              paddingBottom: insets.bottom,
            }}
          >
            <View className="gap-4 pb-4">
              <View className="items-center">
                <Image
                  source={imageSource}
                  className="h-80 aspect-3/4 rounded-xl"
                />
              </View>

              <CustomText font="heading2">{festival.title}</CustomText>

              <CustomText font="body3" className="text-text-muted">
                {festival.description}
              </CustomText>

              <AnimatedButton
                backgroundColor={["#EDEDED", "#E5E5E5"]}
                className="rounded-xl items-center py-5"
                onPress={handleOpenFestivalLink}
              >
                <CustomText font="body3 tight">축제 보러가기</CustomText>
              </AnimatedButton>
            </View>
          </BottomSheetScrollView>
        )}
      </BottomSheetModal>
    );
  },
);

export default FestivalBottomSheetModal;
