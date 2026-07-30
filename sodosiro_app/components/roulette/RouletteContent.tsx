import { SODOSI_LIST } from "@/constants/Sodosi";
import { router } from "expo-router";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Image, Modal, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { AnimatedPressable } from "../common/Animated";
import CustomButton from "../common/CustomButton";
import CustomText from "../common/CustomText";
import RoulettePicker, { RoulettePickerHandle } from "./RoulettePicker";
import RouletteTitle from "./RouletteTitle";

export default function RoulleteContent({
  chance,
  setChance,
}: {
  chance: number;
  setChance: Dispatch<SetStateAction<number>>;
}) {
  const [showRoulette, setShowRoulette] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState<SodosiType | null>(null);
  const rouletteRef = useRef<RoulettePickerHandle>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleRoll = () => {
    if (chance === 0) {
      setIsModalVisible(true);
    } else {
      setChance(chance - 1);
      setResult(null);
      setShowRoulette(true);
      requestAnimationFrame(() => {
        const randomIndex = Math.floor(Math.random() * SODOSI_LIST.length);
        rouletteRef.current?.start(randomIndex);
      });
    }
  };

  return (
    <View className={`flex-1 gap-6 pt-12 pb-30 justify-between`}>
      <RouletteTitle showRoulette={showRoulette} result={result} />
      {!showRoulette && (
        <Animated.View
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(300)}
          className={`flex-1`}
        >
          <Image
            source={require("@/assets/images/dice.gif")}
            resizeMode="contain"
            className="w-full flex-1 mb-15"
          />
          <View className={`px-13 h-25`}>
            <CustomButton
              type="primary"
              title="주사위 굴리기"
              onPress={handleRoll}
            />
          </View>
        </Animated.View>
      )}

      {showRoulette && (
        <Animated.View
          entering={FadeIn.duration(300).delay(300)}
          className="w-full flex-1 items-center justify-center"
        >
          <RoulettePicker
            ref={rouletteRef}
            items={SODOSI_LIST}
            isRolling={isRolling}
            setIsRolling={setIsRolling}
            onFinish={(result) => setResult(result)}
          />
          {result && (
            <RouletteActionBar className={`justify-between`}>
              <CustomButton
                type="primary"
                title={result?.region + " 둘러보기"}
                onPress={() => router.replace("/roulette/result")}
              />
              <CustomText
                font="title tight"
                onPress={handleRoll}
                className={`text-center`}
              >
                다시 굴리기
              </CustomText>
            </RouletteActionBar>
          )}
          {!result && <RouletteActionBar />}
        </Animated.View>
      )}
      <ChanceModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </View>
  );
}

const RouletteActionBar = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(300)}
      className={`${className} px-13 w-full h-25`}
    >
      {children}
    </Animated.View>
  );
};

const ChanceModal = ({
  isModalVisible,
  setIsModalVisible,
}: {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}) => {
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
          <View className={`gap-2 items-center`}>
            <CustomText font="title">오늘의 추천을 모두 사용했어요!</CustomText>
            <CustomText font="body3" className={`text-center text-text-muted`}>
              내일 다시 새로운{"\n"}소도시를 추천해드릴게요.
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
};
