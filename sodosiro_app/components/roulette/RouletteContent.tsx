import { SODOSI_LIST } from "@/constants/Sodosi";
import { router } from "expo-router";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Image, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import CustomButton from "../common/CustomButton";
import CustomText from "../common/CustomText";
import Toggle from "../common/Toggle";
import RoulettePicker, { RoulettePickerHandle } from "./RoulettePicker";
import RouletteTitle from "./RouletteTitle";

export default function RoulleteContent({
  isRolling,
  setIsRolling,
}: {
  isRolling: boolean;
  setIsRolling: Dispatch<SetStateAction<boolean>>;
}) {
  const [onlySmallTown, setOnlySmallTown] = useState(true);
  const [showRoulette, setShowRoulette] = useState(false);
  const [result, setResult] = useState<SodosiType | null>(null);
  const rouletteRef = useRef<RoulettePickerHandle>(null);

  const sodosiList = onlySmallTown
    ? SODOSI_LIST.filter((sodosi) => sodosi.isSmallTown)
    : SODOSI_LIST;

  const handleRoll = () => {
    setResult(null);
    setShowRoulette(true);
    requestAnimationFrame(() => {
      const randomIndex = Math.floor(Math.random() * sodosiList.length);
      rouletteRef.current?.start(randomIndex);
    });
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
          <View className={`px-13 h-25 gap-5 mb-5`}>
            <View className={`flex-row items-center justify-center gap-3`}>
              <CustomText font="body1" className={`text-text-secondary`}>
                소도시만 추천받기
              </CustomText>
              <Toggle
                toggle={onlySmallTown}
                onPress={() => setOnlySmallTown(!onlySmallTown)}
              />
            </View>
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
            items={sodosiList}
            isRolling={isRolling}
            setIsRolling={setIsRolling}
            onFinish={(result) => setResult(result)}
          />
          {result && (
            <RouletteActionBar className={`justify-between`}>
              <CustomButton
                type="primary"
                title={result?.name + " 둘러보기"}
                onPress={() =>
                  router.push({
                    pathname: "/roulette/result",
                    params: { sigunguId: result.sigunguId, title: result.name },
                  })
                }
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
