import { EmptyRateIcon, HalfRateIcon, RateIcon } from "@/assets/svgs";
import { Pressable, View } from "react-native";

interface Props {
  rate: number;
  setRate: (value: number) => void;
  isPending: boolean;
}

export default function Rating({ rate, setRate, isPending }: Props) {
  return (
    <View className="flex-row">
      {Array.from({ length: 5 }).map((_, index) => {
        const score = index + 1;

        let Star = EmptyRateIcon;

        if (rate >= score) {
          Star = RateIcon;
        } else if (rate >= score - 0.5) {
          Star = HalfRateIcon;
        }

        return (
          <View key={score} style={{ width: 36, height: 36 }}>
            <Star width={36} height={36} />

            {/* 왼쪽 절반 */}
            <Pressable
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "50%",
                height: "100%",
              }}
              onPress={() => setRate(score - 0.5)}
              disabled={isPending}
            />

            {/* 오른쪽 절반 */}
            <Pressable
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                width: "50%",
                height: "100%",
              }}
              onPress={() => setRate(score)}
              disabled={isPending}
            />
          </View>
        );
      })}
    </View>
  );
}
