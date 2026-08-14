import { NavigationIcon } from "@/assets/svgs";
import { useLikeMutation } from "@/hooks/mutation/useLikeMutation";
import useSelectedAnimation from "@/hooks/useSelcetedAnimation";
import { Linking } from "react-native";
import BottomActionBar from "../common/BottomActionBar";
import CustomButton from "../common/CustomButton";
import LikeIcon from "../icon/like/LikeIcon";

export default function PlaceDetailBottomBar({
  contentId,
  liked,
  title,
  mapX,
  mapY,
}: {
  contentId: number;
  liked: boolean;
  title: string;
  mapX: number;
  mapY: number;
}) {
  const { fillStyle } = useSelectedAnimation(liked, {
    fill: ["transparent", "#C4D96A"],
  });

  const { mutate, isPending } = useLikeMutation();

  const handleLike = async () => {
    if (isPending) return;
    mutate(contentId);
  };

  const openKakaoMap = () => {
    const webUrl =
      `https://map.kakao.com/link/to/` +
      `${encodeURIComponent(title)},${mapY},${mapX}`;

    Linking.openURL(webUrl);
  };

  return (
    <BottomActionBar>
      <>
        <CustomButton
          type="tertiary"
          title="좋아요"
          Icon={<LikeIcon height={14} animatedFill={fillStyle} />}
          onPress={handleLike}
        />
        <CustomButton
          stretch
          type="primary"
          size="medium"
          title="길찾기"
          onPress={openKakaoMap}
          Icon={<NavigationIcon height={20} />}
        />
      </>
    </BottomActionBar>
  );
}
