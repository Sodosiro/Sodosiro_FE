import { PinIcon } from "@/assets/svgs";
import { useLikePlaceMutation } from "@/hooks/mutation/place";
import useSelectedAnimation from "@/hooks/useSelcetedAnimation";
import { useEffect, useState } from "react";
import { Linking, View } from "react-native";
import BottomActionBar from "../common/BottomActionBar";
import CustomButton from "../common/CustomButton";
import StarIcon from "../icon/like/StarIcon";

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
  const [isLiked, setIsLiked] = useState(liked);

  const { fillStyle } = useSelectedAnimation(isLiked, {
    fill: ["transparent", "#F8CF43"],
  });

  const { mutate, isPending } = useLikePlaceMutation();

  const handleLike = () => {
    if (isPending) return;

    setIsLiked((prev) => !prev);

    mutate([contentId], {
      onError: () => {
        setIsLiked((prev) => !prev);
      },
    });
  };

  useEffect(() => {
    setIsLiked(liked);
  }, [liked]);

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
          title="장소 저장"
          Icon={<StarIcon animatedFill={fillStyle} />}
          onPress={handleLike}
        />
        <CustomButton
          stretch
          type="primary"
          size="medium"
          title="길찾기"
          onPress={openKakaoMap}
          Icon={
            <View className={`w-5`}>
              <PinIcon width={18} height={18} color={"#1a1a1a"} />
            </View>
          }
        />
      </>
    </BottomActionBar>
  );
}
