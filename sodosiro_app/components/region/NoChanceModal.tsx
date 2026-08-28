import { Dispatch, SetStateAction } from "react";
import { Image, Modal, View } from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";
import { AnimatedPressable } from "../common/animated/Animated";
import CustomButton from "../common/CustomButton";
import CustomText from "../common/CustomText";

export default function NoChanceModal({
  isModalVisible,
  setIsModalVisible,
}: {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Modal
      visible={isModalVisible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => setIsModalVisible(false)}
      className={`items-center`}
    >
      <AnimatedPressable
        entering={FadeIn.duration(250)}
        exiting={FadeOut.duration(250)}
        className="absolute inset-0 bg-black/50"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        onPress={() => setIsModalVisible(false)}
      />
      <View className={`w-full h-full items-center justify-center`}>
        <View className={`p-5 bg-bg rounded-xl w-[80%] gap-6`}>
          <Image
            source={require("@/assets/images/no_chance.png")}
            className={`w-full`}
          />
          <View className={`gap-2 items-center px-2`}>
            <CustomText font="title">
              오늘의 일정 생성 횟수를 모두 사용했어요.
            </CustomText>
            <CustomText font="body3" className={`text-center text-text-muted`}>
              내일 다시 새로운 소도시를 추천해드릴게요.
            </CustomText>
          </View>
          <View className={`flex-row`}>
            <CustomButton
              type="secondary"
              title="확인"
              stretch
              onPress={() => setIsModalVisible(false)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
