import { useEffect, useRef, useState } from "react";
import { Image, ImageResizeMode, ImageSourcePropType } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function ImageList({
  placeId,
  images,
  resizeMode = "contain",
  height,
}: {
  placeId: number;
  images: string[] | string | ImageSourcePropType;
  resizeMode?: ImageResizeMode;
  height: number;
}) {
  const scrollRef = useRef<ScrollView>(null);
  const imageList = !images ? [] : Array.isArray(images) ? images : [images];

  useEffect(() => {
    scrollRef.current?.scrollTo({ x: 0, animated: false });
  }, [placeId]);

  if (imageList.length === 0) {
    return null;
  }

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 20,
        gap: 12,
      }}
      className={`grow-0 pb-4`}
    >
      {imageList.map((item, index) => (
        <ImageItem
          key={index}
          image={item}
          height={height}
          resizeMode={resizeMode}
        />
      ))}
    </ScrollView>
  );
}

function ImageItem({
  image,
  height,
  resizeMode,
}: {
  image: string | ImageSourcePropType;
  height: number;
  resizeMode: ImageResizeMode;
}) {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  const source = typeof image === "string" ? { uri: image } : image;

  return (
    <Image
      source={source}
      style={{
        height,
        ...(aspectRatio && { width: height * aspectRatio }),
        borderRadius: 20,
      }}
      resizeMode={resizeMode}
      onLoad={(event) => {
        const { width, height } = event.nativeEvent.source;
        setAspectRatio(width / height);
      }}
    />
  );
}
