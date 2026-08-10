import { postLikeApi } from "@/api/place";
import { NavigationIcon } from "@/assets/svgs";
import useSelectedAnimation from "@/hooks/useSelcetedAnimation";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import BottomActionBar from "../common/BottomActionBar";
import CustomButton from "../common/CustomButton";
import FavoriteIcon from "../icon/FavoriteIcon";

export default function PlaceDetailBottomBar({
  contentId,
  liked,
}: {
  contentId: number;
  liked: boolean;
}) {
  const [isLiked, setIsLiked] = useState(liked);

  const { fillStyle } = useSelectedAnimation(isLiked, {
    fill: ["transparent", "#C4D96A"],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () => postLikeApi(contentId),
    onSuccess: (response) => {
      setIsLiked(response.data.liked);
    },
  });

  const handleLike = () => {
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
