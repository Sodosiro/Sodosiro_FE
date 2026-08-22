import { postLikePlacesApi } from "@/api/place";
import { useExploreStore } from "@/stores/useExploreStore";
import { invalidateQueries } from "@/util/query/invalidateQueries";
import { useMutation } from "@tanstack/react-query";

export function useLikePlaceMutation() {
  const { updatePlaceLikeOptimistic, updatePlaceLike } = useExploreStore();

  const { mutate, isPending } = useMutation({
    mutationFn: (contentIds: number[]) => postLikePlacesApi(contentIds),

    onMutate: (contentIds) => {
      updatePlaceLikeOptimistic(contentIds);
    },

    onSuccess: (response, contentIds) => {
      updatePlaceLike(response.data.items);

      contentIds.forEach((contentId) => {
        invalidateQueries([["placeDetail", contentId]]);
      });
      invalidateQueries([["likePlaces"]]);
    },
  });

  return {
    mutate,
    isPending,
  };
}
