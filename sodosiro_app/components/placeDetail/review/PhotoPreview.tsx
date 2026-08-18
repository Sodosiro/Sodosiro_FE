import CustomText from "@/components/common/CustomText";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, View } from "react-native";

export default function PhotoPreview({
  placeId,
  photoReviews,
}: {
  placeId: string;
  photoReviews: ReviewType[];
}) {
  const images = photoReviews.flatMap((review) => review.images ?? []);

  if (!images?.length) return null;

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
                      placeId: placeId,
                    },
                  })
                }
              >
                <CustomText font="body2" className={`text-white px-px`}>
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
