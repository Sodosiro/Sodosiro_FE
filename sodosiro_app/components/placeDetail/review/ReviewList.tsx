import { AnimatedPressable } from "@/components/common/animated/Animated";
import { Dispatch, SetStateAction, useState } from "react";
import { Image, Modal, Pressable } from "react-native";
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imageSource: string) => {
    setSelectedImage(imageSource);
    setIsModalVisible(true);
  };

  return (
    <>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <Review
            key={review.id}
            review={review}
            isLast={reviews.length - 1 === index}
            prev={prev}
            handleImageClick={handleImageClick}
          />
        ))
      ) : (
        <EmptyReview title={title} />
      )}
      <ReviewImageModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        imageSource={selectedImage as string}
      />
    </>
  );
}

const ReviewImageModal = ({
  isModalVisible,
  setIsModalVisible,
  imageSource,
}: {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  imageSource: string;
}) => {
  return (
    <Modal
      visible={isModalVisible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => setIsModalVisible(false)}
      className={`items-center`}
    >
      <AnimatedPressable
        entering={FadeIn.duration(250)}
        exiting={FadeOut.duration(250)}
        className="absolute inset-0 bg-black/50"
        style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        onPress={() => setIsModalVisible(false)}
      />
      <Pressable
        className={`flex-1 w-full items-center justify-center`}
        onPress={() => setIsModalVisible(false)}
      >
        <Image
          className={`w-[80%] aspect-square rounded-xl`}
          source={{ uri: imageSource }}
        />
      </Pressable>
    </Modal>
  );
};
