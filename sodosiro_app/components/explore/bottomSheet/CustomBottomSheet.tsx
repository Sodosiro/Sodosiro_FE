import { View } from "react-native";
import BottomSheet, {
  BottomSheetFlatList,
  useBottomSheetSpringConfigs,
} from "@gorhom/bottom-sheet";
import { PlaceList } from "@/mocks/places";
import Place from "./Place";
import type { SharedValue } from "react-native-reanimated";
import { BottomSheetSnapPoints } from "@/constants/BottomSheet";

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
        data={PlaceList}
        nestedScrollEnabled
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{
          paddingBottom: 10,
        }}
        renderItem={({ item, index }) => (
          <View key={index}>
            <Place place={item} />
            {index !== PlaceList.length - 1 && (
              <View className="h-px bg-bg-subtle mx-5" />
            )}
          </View>
        )}
      ></BottomSheetFlatList>
    </BottomSheet>
  );
}
