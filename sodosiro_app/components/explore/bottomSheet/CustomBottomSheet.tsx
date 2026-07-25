import { BottomSheetSnapPoints } from "@/constants/BottomSheet";
import { PLACE_LIST } from "@/mocks/places";
import BottomSheet, {
  BottomSheetFlatList,
  useBottomSheetSpringConfigs,
} from "@gorhom/bottom-sheet";
import { View } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Place from "./Place";

export default function CustomBottomSheet({
  animatedPosition,
}: {
  animatedPosition: SharedValue<number>;
}) {
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 100,
    stiffness: 400,
    mass: 1,
  });

  return (
    <BottomSheet
      index={1}
      snapPoints={BottomSheetSnapPoints}
      animatedPosition={animatedPosition}
      backgroundStyle={{
        backgroundColor: "white",
      }}
      handleIndicatorStyle={{
        backgroundColor: "#E6E6E6",
        width: 50,
        height: 5,
      }}
      enableDynamicSizing={false}
      enablePanDownToClose={false}
      enableContentPanningGesture={true}
      enableHandlePanningGesture={true}
      animationConfigs={animationConfigs}
    >
      <BottomSheetFlatList
        data={PLACE_LIST}
        nestedScrollEnabled
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{
          paddingBottom: 10,
        }}
        renderItem={({ item, index }) => (
          <View key={index}>
            <Place place={item} />
            {index !== PLACE_LIST.length - 1 && (
              <View className="h-px bg-bg-subtle mx-5" />
            )}
          </View>
        )}
      ></BottomSheetFlatList>
    </BottomSheet>
  );
}
