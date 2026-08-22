import { useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import FeedItem from "./FeedItem";

export default function FeedDetailContent({
  feed,
  initialImageUrl,
}: {
  feed: FeedType;
  initialImageUrl?: string | null;
}) {
  const [currentImageUrl, setCurrentImageUrl] = useState(
    initialImageUrl &&
      feed.images?.some((image) => image.imageUrl === initialImageUrl)
      ? initialImageUrl
      : feed.images?.[0].imageUrl,
  );

  const opacity = useSharedValue(1);

  const changeImage = (imageUrl: string) => {
    if (imageUrl === currentImageUrl) return;

    opacity.value = withTiming(0, {
      duration: 150,
    });

    setTimeout(() => {
      setCurrentImageUrl(imageUrl);

      opacity.value = withTiming(1, {
        duration: 150,
      });
    }, 150);
  };

  return (
    <View className={`w-screen pb-20 flex-1`}>
      <View className={`gap-3`}>
        <Animated.Image
          source={{ uri: currentImageUrl }}
          className={`w-screen aspect-square bg-bg-subtle`}
          style={{ opacity }}
          resizeMode="contain"
        />
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="w-full px-4"
        >
          {feed.images?.map((image, index) => (
            <Thumbnail
              key={image.imageUrl + index}
              image={image}
              selected={currentImageUrl === image.imageUrl}
              onPress={() => changeImage(image.imageUrl)}
            />
          ))}
        </ScrollView>
      </View>

      <View className={`px-5 flex-1 pb-10`}>
        <FeedItem feed={feed} withoutPhoto />
      </View>
    </View>
  );
}

const Thumbnail = ({
  image,
  selected,
  onPress,
}: {
  image: {
    imageUrl: string;
    order: number;
  };
  selected: boolean;
  onPress: () => void;
}) => {
  const progress = useSharedValue(selected ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(selected ? 1 : 0, {
      duration: 200,
    });
  }, [selected]);

  const animatedStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      progress.value,
      [0, 1],
      ["#ffffff", "#7e9432"],
    ),
  }));

  return (
    <Pressable onPress={onPress} className="w-1/5 px-1">
      <Animated.Image
        source={{ uri: image.imageUrl }}
        className="w-full rounded-xl aspect-square border-2"
        style={animatedStyle}
      />
    </Pressable>
  );
};
