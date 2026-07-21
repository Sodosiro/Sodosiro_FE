import { View } from "react-native";
import BottomSheet, {
  BottomSheetFlatList,
  useBottomSheetSpringConfigs,
} from "@gorhom/bottom-sheet";
import { PlaceList } from "@/mocks/places";
import Place from "./Place";

export default function CustomBottomSheet() {
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 100,
    stiffness: 400,
    mass: 1,
  });

  return (
    <BottomSheet
      index={1}
      snapPoints={[24, 226, "80%"]}
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
