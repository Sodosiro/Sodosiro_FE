import { AnimatedPressable } from "@/components/common/animated/Animated";
import CustomCarousel from "@/components/common/CustomCarousel";
import { Dispatch, SetStateAction } from "react";
import { Modal, View } from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";

export default function ReviewImageModal({
  isModalVisible,
  setIsModalVisible,
  images,
  defaultIndex,
}: {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  images: string[];
  defaultIndex: number;
}) {
  return (
    <Modal
      visible={isModalVisible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View className={`flex-1 items-center justify-center`}>
        <AnimatedPressable
          entering={FadeIn.duration(250)}
          exiting={FadeOut.duration(250)}
          className="absolute inset-0 bg-black/50"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          onPress={() => setIsModalVisible(false)}
        />
        <CustomCarousel
          images={images}
          autoPlay={false}
          defaultIndex={defaultIndex}
          aspect={1}
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
}
