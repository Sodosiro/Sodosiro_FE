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
    ? "오늘의 소도시 뽑기"
    : !result
      ? "오늘의 소도시 뽑는 중"
      : "오늘 떠날 곳은";

  const comment = !showRoulette
    ? "AI가 숨은 여행지를 찾아드려요"
    : !result
      ? "아직 많이 알려지지 않은 곳을 찾고 있어요"
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
