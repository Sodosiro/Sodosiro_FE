import {
  Dimensions,
  Image,
  ImageResizeMode,
  ImageSourcePropType,
  View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { Pagination } from "react-native-reanimated-carousel";

export default function CustomCarousel({
  images,
  autoPlay = true,
  defaultIndex = 0,
  aspect = 3 / 4,
  resizeMode = "cover",
}: {
  images: string[] | string | ImageSourcePropType;
  autoPlay?: boolean;
  defaultIndex?: number;
  aspect?: number;
  resizeMode?: ImageResizeMode;
}) {
  const width = Dimensions.get("window").width;
  const progress = useSharedValue(0);
  const imageList = !images ? [] : Array.isArray(images) ? images : [images];

  const getImageSource = (
    image: string | ImageSourcePropType,
  ): ImageSourcePropType =>
    typeof image === "string" ? { uri: image } : image;

  return (
    <View>
      {imageList?.length > 1 ? (
        <>
          <Carousel
            defaultIndex={defaultIndex}
            autoPlay={autoPlay}
            autoPlayInterval={3000}
            width={width}
            height={width * aspect}
            data={imageList}
            onProgressChange={progress}
            renderItem={({ item }) => (
              <Image
                source={getImageSource(item)}
                style={{
                  width: "100%",
                  aspectRatio: 1 / aspect,
                }}
                resizeMode={resizeMode}
              />
            )}
          />
          <Pagination.Custom
            progress={progress}
            data={imageList}
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
      ) : imageList?.length === 1 ? (
        <Image
          source={getImageSource(imageList[0])}
          style={{
            width,
            height: width * aspect,
          }}
          resizeMode={resizeMode}
        />
      ) : (
        <></>
      )}
    </View>
  );
}
