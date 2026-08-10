import { AnimatedPressable } from "@/components/common/animated/Animated";
import CustomCarousel from "@/components/common/CustomCarousel";
import { Dispatch, SetStateAction, useState } from "react";
import { Modal, View } from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";
import Review from "./Review";
import EmptyReview from "./ReviewEmpty";

export default function ReviewList({
  title,
  reviews,
  prev = false,
}: {
  title: string;
  reviews: ReviewType[];
  prev?: boolean;
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[] | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleImageClick = (images: string[], index: number) => {
    setSelectedImages(images);
    setCarouselIndex(index);
    setIsModalVisible(true);
  };

  return (
    <>
      {reviews?.length > 0 ? (
        reviews?.map((review, index) => (
          <Review
            key={review?.reviewId}
            review={review}
            isLast={reviews.length - 1 === index}
            prev={prev}
            handleImageClick={handleImageClick}
          />
        ))
      ) : (
        <EmptyReview title={title} showWriteButton={prev} />
      )}
      <ReviewImageModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        images={selectedImages as string[]}
        defaultIndex={carouselIndex}
      />
    </>
  );
}

const ReviewImageModal = ({
  isModalVisible,
  setIsModalVisible,
  images,
  defaultIndex,
}: {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  images: string[];
  defaultIndex: number;
}) => {
  return (
    <Modal
      visible={isModalVisible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View className={`flex-1 items-center justify-center`}>
        <AnimatedPressable
          entering={FadeIn.duration(250)}
          exiting={FadeOut.duration(250)}
          className="absolute inset-0 bg-black/50"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          onPress={() => setIsModalVisible(false)}
        />
        <CustomCarousel
          images={images}
          autoPlay={false}
          defaultIndex={defaultIndex}
          aspect={1}
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
};
