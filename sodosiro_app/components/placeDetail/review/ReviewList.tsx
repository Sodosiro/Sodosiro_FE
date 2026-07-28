import Review from "./Review";
import EmptyReview from "./ReviewEmpty";

export default function ReviewList({
  reviews,
  prev = false,
}: {
  reviews: ReviewType[];
  prev?: boolean;
}) {
  return reviews.length > 0 ? (
    reviews.map((review, index) => (
      <Review
        key={review.id}
        review={review}
        isLast={reviews.length - 1 === index}
        prev={prev}
      />
    ))
  ) : (
    <EmptyReview />
  );
}
