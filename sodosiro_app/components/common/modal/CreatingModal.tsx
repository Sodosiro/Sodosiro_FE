import LottieView from "lottie-react-native";
import { Modal, Pressable, View } from "react-native";
import CustomText from "../CustomText";

export default function CreatingModal({
  isVisible,
  title,
  description,
}: {
  isVisible: boolean;
  title: string;
  description: string;
}) {
  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <Pressable
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <View
          className="w-[75%] rounded-2xl bg-bg p-8 items-center"
          onStartShouldSetResponder={() => true}
        >
          <LottieView
            source={require("@/assets/animation/generating.json")}
            resizeMode="contain"
            autoPlay
            style={{
              width: 160,
              height: 160,
            }}
          />
          <View className={`items-center gap-2`}>
            <CustomText font="title" className={`text-center`}>
              {title}
            </CustomText>
            <CustomText font="body3" className={`text-text-muted text-center`}>
              {description}
            </CustomText>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}
