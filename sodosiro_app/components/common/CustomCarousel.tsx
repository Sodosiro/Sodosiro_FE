import { Dimensions, Image, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { Pagination } from "react-native-reanimated-carousel";

export default function CustomCarousel({ images }: { images: string[] }) {
  const width = Dimensions.get("window").width;

  const progress = useSharedValue(0);

  return (
    <View>
      {images.length > 1 ? (
        <>
          <Carousel
            autoPlay
            autoPlayInterval={3000}
            width={width}
            height={(width / 4) * 3}
            data={images}
            onProgressChange={progress}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={{ width: "100%", aspectRatio: 4 / 3 }}
                resizeMode="cover"
              />
            )}
          />
          <Pagination.Custom
            progress={progress}
            data={images}
            dotStyle={{
              width: 6,
              height: 6,
              backgroundColor: "#E2E2E8",
              borderRadius: 999,
            }}
            activeDotStyle={{
              backgroundColor: "#1A1A1A",
            }}

            containerStyle={{
              gap: 6,
              position: "absolute",
              bottom: 12,
            }}
          />
        </>
      ) : images.length === 1 ? (
        <Image source={{ uri: images[0] }} className={`w-screen aspect-4/3`} />
      ) : (
        <></>
      )}
    </View>
  );
}
