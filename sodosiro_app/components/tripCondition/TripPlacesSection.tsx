import { SpotItem } from "@/api/course";
import CustomText from "@/components/common/CustomText";
import Spinner from "@/components/common/Spinner";
import { useAlternativeSpotsQuery } from "@/hooks/query/course";
import { View } from "react-native";
import TripPlacesList from "./TripPlacesList";

type Props = {
  contentId: number; // 대체 추천을 조회할 대상 장소의 contentId
  onSelectPlace?: (place: SpotItem) => void;
};

export default function TripPlacesSection({ contentId, onSelectPlace }: Props) {
  // 대체 장소 추천 쿼리 호출
  const { data, isPending } = useAlternativeSpotsQuery(contentId);

  const isEmpty = !data || data?.data.length == 0;
  const places = data?.data;

  return (
    <View className="flex-col px-5 gap-3">
      {isPending ? (
        <View className="justify-center items-center h-91.5">
          <Spinner />
        </View>
      ) : isEmpty ? (
        /* 대체 추천 장소가 없을 때 */
        <View className="justify-center items-center h-91.5 gap-2">
          <CustomText font="title">추천할 대체 장소가 없어요.</CustomText>
          <CustomText font="body3" className="text-text-muted">
            주변에 추천할 만한 대체 장소를 찾지 못했습니다.
          </CustomText>
        </View>
      ) : (
        /* 대체 장소 목록 표시 */
        <View>
          <View className="py-3">
            <CustomText font="title">장소 변경하기</CustomText>
          </View>
          <TripPlacesList
            places={places}
            onSelectPlace={(place) => {
              onSelectPlace?.(place);
            }}
          />
        </View>
      )}
    </View>
  );
}
