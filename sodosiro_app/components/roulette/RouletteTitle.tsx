import { useEffect, useRef } from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import CustomText from "../common/CustomText";

export default function RouletteTitle({
  showRoulette,
  result,
}: {
  showRoulette: boolean;
  result: SodosiType | null;
}) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  const title = !showRoulette
    ? "강원도 랜덤 여행지 뽑기"
    : !result
      ? "강원도 여행지 뽑는 중"
      : "오늘 떠날 곳은";

  const comment = !showRoulette
    ? "AI가 강원도에서 떠날 새로운 곳을 찾아드려요"
    : !result
      ? "강원도의 다양한 지역을 살펴보고 있어요"
      : result.comment;

  return (
    <Animated.View
      key={`${title}-${comment}`}
      entering={
        isFirstRender.current
          ? FadeIn.duration(300)
          : FadeIn.duration(300).delay(200)
      }
      exiting={FadeOut.duration(300)}
      className={`items-center px-10`}
    >
      <CustomText font="display">{title}</CustomText>
      <CustomText
        font="body3"
        className={`text-text-secondary text-center h-12`}
      >
        {comment}
      </CustomText>
    </Animated.View>
  );
}
