import { SortMiniIcon } from "@/assets/svgs";
import { Dispatch, SetStateAction } from "react";
import { Modal, Pressable, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";
import CustomText from "../CustomText";

const SORT_OPTIONS = ["최신순", "오래된순", "오름차순", "내림차순"];
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function SortBadge({
  isSortModalVisible,
  setIsSortModalVisible,
  sortOption,
  setSortOption,
}: {
  isSortModalVisible: boolean;
  setIsSortModalVisible: Dispatch<SetStateAction<boolean>>;
  sortOption: string;
  setSortOption: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <Pressable
        className="flex-row gap-1 rounded-full border border-border px-4 py-2.5"
        onPress={() => setIsSortModalVisible(true)}
      >
        <SortMiniIcon />
        <CustomText font="body3 tight">{sortOption}</CustomText>
      </Pressable>

      <Modal
        visible={isSortModalVisible}
        transparent
        animationType="none"
        onRequestClose={() => setIsSortModalVisible(false)}
      >
        <View className="flex-1 justify-end">
          {/* 어두운 배경 */}
          <AnimatedPressable
            entering={FadeIn.duration(250)}
            exiting={FadeOut.duration(250)}
            className="absolute inset-0 bg-black/50"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onPress={() => setIsSortModalVisible(false)}
          />

          {/* 아래에서 올라오는 모달 */}
          <Animated.View
            entering={SlideInDown.duration(250)}
            exiting={SlideOutDown.duration(250)}
            className="rounded-t-3xl bg-white px-5 pb-8 pt-6"
          >
            <CustomText font="heading2" className="mb-5">
              정렬
            </CustomText>

            {SORT_OPTIONS.map((option) => (
              <Pressable
                key={option}
                className="py-4"
                onPress={() => {
                  setSortOption(option);
                  setIsSortModalVisible(false);
                }}
              >
                <CustomText
                  font="body1"
                  className={
                    option === sortOption
                      ? "text-primary-dark"
                      : "text-text-primary"
                  }
                >
                  {option}
                </CustomText>
              </Pressable>
            ))}
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}
