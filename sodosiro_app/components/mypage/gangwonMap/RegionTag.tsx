import CustomText from "@/components/common/CustomText";
import Animated, { Keyframe } from "react-native-reanimated";

type Props = {
  animateKey: string;
  x: number;
  y: number;
  name: string;
  mapSize: {
    width: number;
    height: number;
  };
};

export default function RegionTag({ animateKey, x, y, name, mapSize }: Props) {
  return (
    <Animated.View
      key={animateKey}
      entering={tagEntering}
      exiting={tagExiting}
      className="absolute rounded-full border border-primary bg-bg px-2.5 py-1.5 min-w-11.5"
      style={{
        left: (x / 800) * mapSize.width - 20,
        top: (y / 699) * mapSize.height - 24 - 28,
      }}
    >
      <CustomText
        font="body2 tight"
        className={`text-primary-dark text-center`}
      >
        {name}
      </CustomText>
    </Animated.View>
  );
}

const tagEntering = new Keyframe({
  0: {
    opacity: 0,
    transform: [{ translateY: 4 }],
  },
  100: {
    opacity: 1,
    transform: [{ translateY: 0 }],
  },
}).duration(150);

const tagExiting = new Keyframe({
  0: {
    opacity: 1,
    transform: [{ translateY: 0 }],
  },
  100: {
    opacity: 0,
    transform: [{ translateY: 4 }],
  },
}).duration(150);
