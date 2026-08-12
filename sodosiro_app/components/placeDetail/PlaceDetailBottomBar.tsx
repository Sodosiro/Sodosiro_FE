import { postLikeApi } from "@/api/place";
import { NavigationIcon } from "@/assets/svgs";
import useSelectedAnimation from "@/hooks/useSelcetedAnimation";
import { queryClient } from "@/lib/queryClient";
import { useExploreStore } from "@/stores/useExploreStore";
import { useMutation } from "@tanstack/react-query";
import BottomActionBar from "../common/BottomActionBar";
import CustomButton from "../common/CustomButton";
import FavoriteIcon from "../icon/favorite/FavoriteIcon";

export default function PlaceDetailBottomBar({
  contentId,
  liked,
}: {
  contentId: number;
  liked: boolean;
}) {
  const { fillStyle } = useSelectedAnimation(liked, {
    fill: ["transparent", "#C4D96A"],
  });

  const updatePlaceLike = useExploreStore((state) => state.updatePlaceLike);

  const { mutate, isPending } = useMutation({
    mutationFn: () => postLikeApi(contentId),
    onSuccess: (response) => {
      const liked = response.data.liked;
      updatePlaceLike(contentId, liked);
      queryClient.invalidateQueries({
        queryKey: ["placeDetail", contentId],
      });
    },
  });

  const handleLike = async () => {
    if (isPending) return;
    mutate();
  };

  return (
    <BottomActionBar>
      <>
        <CustomButton
          type="tertiary"
          title="좋아요"
          Icon={<FavoriteIcon height={14} animatedFill={fillStyle} />}
          onPress={handleLike}
        />
        <CustomButton
          stretch
          type="primary"
          size="medium"
          title="길찾기"
          Icon={<NavigationIcon height={20} />}
        />
      </>
    </BottomActionBar>
  );
}
