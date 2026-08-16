import { LeftIcon } from "@/assets/svgs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import FeedItem from "./FeedItem";

export default function FeedDetailModal({
  feeds,
  visible,
  setVisible,
  initialfeedId,
  initialImageUrl,
  onClose,
}: {
  feeds: FeedType[];
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  initialfeedId: number | null;
  initialImageUrl: string | null;
  onClose: () => void;
}) {
  const { width } = Dimensions.get("window");

  // FlatList가 실제로 사용하는 배열 기준으로 인덱스를 계산
  const feedsWithImages = feeds?.filter((feed) => feed.images?.length);

  const initialIndex = Math.max(
    0,
    feedsWithImages?.findIndex((feed) => feed.feedId === initialfeedId),
  );

  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={() => setVisible(false)}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View className={`px-5 py-2 h-16 justify-center`}>
          <LeftIcon onPress={onClose} />
        </View>
        <FlatList
          horizontal
          pagingEnabled
          decelerationRate="normal"
          initialScrollIndex={initialIndex}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          showsHorizontalScrollIndicator={false}
          data={feedsWithImages}
          keyExtractor={(item) => item.feedId.toString()}
          renderItem={({ item }) => (
            <FeedDetailModalContent
              feed={item}
              initialImageUrl={
                item.feedId === initialfeedId ? initialImageUrl : null
              }
            />
          )}
        />
      </SafeAreaView>
    </Modal>
  );
}

const FeedDetailModalContent = ({
  feed,
  initialImageUrl,
}: {
  feed: FeedType;
  initialImageUrl?: string | null;
}) => {
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
    <View className={`w-screen pb-20`}>
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
};

const Thumbnail = ({
  image,
  selected,
  onPress,
}: {
  image: {
    imageUrl: string;
    displayOrder: number;
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
