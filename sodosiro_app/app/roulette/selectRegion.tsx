import { RightIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import Header from "@/components/common/Header";
import { SODOSI_LIST } from "@/constants/Sodosi";
import { tagStyle } from "@/styles/Tag";
import { router } from "expo-router";
import { FlatList, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SelectRegionScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <Header title="지역 직접 선택하기" />
      <FlatList
        data={SODOSI_LIST}
        contentContainerClassName="px-5 gap-1"
        keyExtractor={(item) => String(item.sigunguId)}
        ListHeaderComponent={
          <View className={`py-5`}>
            <CustomText font="heading2">강원도 어디로 떠나시나요?</CustomText>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            className={`h-14 flex-row items-center gap-2`}
            onPress={() =>
              router.replace({
                pathname: "/roulette/result",
                params: {
                  title: item.name,
                  sigunguId: item.sigunguId,
                },
              })
            }
          >
            <View
              className={`flex-1 flex-row justify-start items-center gap-2`}
            >
              <CustomText font="title">{item.name}</CustomText>
              {item.isSmallTown && (
                <View className={`${tagStyle} bg-bg-subtle`}>
                  <CustomText font="body3 tight">소도시로 추천</CustomText>
                </View>
              )}
            </View>
            <RightIcon width={16} />
          </Pressable>
        )}
      />
    </View>
  );
}
