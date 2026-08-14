import { postLikeApi } from "@/api/place";
import { useExploreStore } from "@/stores/useExploreStore";
import { invalidateQueries } from "@/util/query/invalidateQueries";
import { useMutation } from "@tanstack/react-query";

export function useLikeMutation() {
  const updatePlaceLike = useExploreStore((state) => state.updatePlaceLike);

  const { mutate, isPending } = useMutation({
    mutationFn: (contentId: number) => postLikeApi(contentId),

    onSuccess: (response, contentId) => {
      updatePlaceLike(contentId, response.data.liked);

      invalidateQueries([["placeDetail", contentId], ["likePlaces"]]);
    },
  });

  return {
    mutate,
    isPending,
  };
}
