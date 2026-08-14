import { getMyReviewApi } from "@/api/review";
import { useQuery } from "@tanstack/react-query";

export function useMyReviewQuery(reviewId: number) {
  return useQuery({
    queryKey: ["myReview", reviewId],
    queryFn: () => getMyReviewApi(reviewId),
    enabled: !!reviewId,
  });
}
