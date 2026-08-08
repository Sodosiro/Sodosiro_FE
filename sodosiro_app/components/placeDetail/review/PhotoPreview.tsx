import CustomText from "@/components/common/CustomText";
import { REVIEW_LIST } from "@/mocks/places";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, View } from "react-native";

export default function PhotoPreview() {
  const images = REVIEW_LIST.reviews.flatMap((review) => review.images ?? []);

  return (
    <View className={`pb-8 gap-3`}>
      <CustomText font="heading2">사진</CustomText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-1"
      >
        {images.slice(0, 5).map((image, index) => (
          <View
            key={image.imageUrl + image.displayOrder}
            className={`w-20 h-20 rounded-xl relative`}
          >
            <Image
              source={{ uri: image.imageUrl }}
              className={`w-20 h-20 rounded-xl`}
            />
            {index === 4 && (
              <Pressable
                className={`absolute w-20 h-20 rounded-xl bg-[rgba(0,0,0,0.5)] items-center justify-center`}
                onPress={() =>
                  router.push({
                    pathname: "/place/[placeId]/photo",
                    params: {
                      placeId: "123",
                    },
                  })
                }
              >
                <CustomText font="body2" className={`text-white`}>
                  더보기
                </CustomText>
              </Pressable>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
