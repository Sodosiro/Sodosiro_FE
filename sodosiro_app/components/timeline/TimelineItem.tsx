import {
  CarRouteLeg,
  CourseStatus,
  SpotItem,
  TransitRouteDetail,
  TransportMode,
} from "@/api/course";
import { AlignIcon, StarIcon, VerificationIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import Dropdown from "@/components/common/Dropdown";
import { COURSE_STATE } from "@/constants/Trip";
import { NumberToCategory } from "@/util/place/category";
import { router } from "expo-router";
import { memo } from "react";
import { Linking, Pressable, View } from "react-native";
import Tag from "../place/Tag";
import ActionBadge from "../trip/badge/ActionBadge";
import BusRouteSummaryCard from "../trip/BusRouteSummaryCard";
import CarRouteSummaryCard from "../trip/CarRouteSummaryCard";

type TimelineItemProps = {
  place: SpotItem;
  nextPlace?: SpotItem;
  isExpanded: boolean;
  onToggle: (key: string) => void;
  order: number;
  mode: CourseStatus | "TEMP";
  transportMode?: TransportMode;
  routeDetail?: TransitRouteDetail | null; // 대중교통 세부 경로
  carRouteLeg?: CarRouteLeg | null; // 자차 세부 경로
  onLongPress?: () => void;
  onVerificationPlace?: () => void;
  isEditing?: boolean;
  isAuthCompleted?: boolean;
  isFirstIndex: boolean;
  onChangePlace?: () => void;
};

function TimelineItem({
  place,
  nextPlace,
  isExpanded,
  onToggle,
  order,
  mode,
  transportMode,
  routeDetail,
  carRouteLeg,
  onLongPress,
  onVerificationPlace,
  isEditing = false,
  isFirstIndex = false,
  onChangePlace,
}: TimelineItemProps) {
  const handleToggle = () => {
    if (!isEditing) {
      onToggle(`${place.contentId}`);
    }
  };

  const handleOpenKakaoMap = () => {
    if (!nextPlace) return;

    const transport = transportMode === "CAR" ? "car" : "publictransit";

    const url =
      `kakaomap://route` +
      `?sp=${place.mapY},${place.mapX}` +
      `&ep=${nextPlace.mapY},${nextPlace.mapX}` +
      `&by=${transport}`;

    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        const webUrl =
          `http://m.map.kakao.com/scheme/route` +
          `?sp=${place.mapY},${place.mapX}` +
          `&ep=${nextPlace.mapY},${nextPlace.mapX}` +
          `&by=${transport}`;

        Linking.openURL(webUrl);
      }
    });
  };

  const renderActionButton = () => {
    /** 임시저장 */
    if (mode === COURSE_STATE.TEMP) {
      return (
        <ActionBadge
          onPress={() => onChangePlace?.()}
          text="장소 변경하기"
          selected={true}
        />
      );
    }

    /** 진행 중 */
    if (mode === COURSE_STATE.IN_PROGRESS) {
      if (place.gpsVerified) {
        return (
          <ActionBadge
            onPress={() => {}}
            text="방문 인증 완료"
            selected={true}
            isGpsVerificated={true}
          />
        );
      }
      return (
        <ActionBadge
          onPress={() => onVerificationPlace?.()}
          text="방문 인증하기"
          selected={true}
          primary={true}
          isGpsVerificated={false}
        />
      );
    }

    /** 완료 */
    if (mode === COURSE_STATE.FINISHED) {
      const reviewId = place.reviewId;
      if (place.reviewWritten && reviewId !== null && reviewId !== undefined) {
        return (
          <ActionBadge
            onPress={() =>
              router.push({
                pathname: "/place/[placeId]/reviewModify",
                params: {
                  placeId: place.contentId,
                  reviewId,
                  title: place.title,
                },
              })
            }
            text="리뷰 수정하기"
            selected={true}
            primary={true}
          />
        );
      } else {
        return (
          <ActionBadge
            onPress={() =>
              router.push({
                pathname: "/place/[placeId]/reviewWrite",
                params: { placeId: place.contentId, title: place.title },
              })
            }
            text="리뷰 작성하기"
            selected={true}
            primary={true}
          />
        );
      }
    }

    return null;
  };

  return (
    <View className="pb-3 bg-bg">
      <View className="flex-row">
        <View className="w-6 mr-2.5 h-3" />
        {isFirstIndex || isEditing ? null : (
          <View className="h-3 flex-1 border-t border-border" />
        )}
      </View>

      <Dropdown
        isExpanded={isExpanded}
        onToggle={handleToggle}
        disabled={isEditing}
        header={
          <Pressable
            className="flex-row flex-1 items-center"
            onPress={handleToggle}
            onLongPress={isEditing ? onLongPress : undefined}
            disabled={isEditing && !onLongPress}
          >
            {isEditing ? (
              <View className="w-6 h-6 items-center mr-2.5 shrink-0">
                <AlignIcon />
              </View>
            ) : (
              <View className="w-6 h-6 rounded-xl bg-text-primary items-center justify-center mr-2.5 shrink-0">
                <CustomText font="body3" className="text-white">
                  {order}
                </CustomText>
              </View>
            )}

            <View className="flex-row gap-1 items-center min-w-0 max-w-full shrink">
              <CustomText font="title" numberOfLines={1} className="shrink">
                {place.title}
              </CustomText>
              {place.gpsVerified && <VerificationIcon width={14} />}

              <View className="shrink-0">
                <Tag category={NumberToCategory[place?.category]} />
              </View>
            </View>
          </Pressable>
        }
      >
        {place && (
          <View className="pl-8.5 gap-2 overflow-visible">
            <View className="gap-1">
              {place.overview && (
                <View>
                  <CustomText
                    font="body2"
                    className="text-text-secondary pr-8"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {place.overview}
                  </CustomText>
                </View>
              )}
              <View className="flex-row items-center gap-1">
                <StarIcon />
                <CustomText font="body2">{place?.avgRating}</CustomText>
                {place.reviewCount !== undefined && (
                  <CustomText font="body3" className="text-text-muted">
                    ({place.reviewCount})
                  </CustomText>
                )}
              </View>
            </View>

            <View className="flex-row gap-2">
              <ActionBadge
                onPress={() => {
                  router.push({
                    pathname: "/place/[placeId]",
                    params: { placeId: place.contentId },
                  });
                }}
                text="장소 상세보기"
                selected={false}
              />

              {renderActionButton()}
            </View>
          </View>
        )}

        {/* 경로 정보 카드 렌더링 (임시 저장 상태가 아니고 경로 데이터가 존재할 때만 표시) */}
        {mode !== COURSE_STATE.TEMP && (
          <>
            {transportMode === "PUBLIC_TRANSPORT" && routeDetail && (
              <BusRouteSummaryCard
                routeDetail={routeDetail}
                onPressKakaoMap={handleOpenKakaoMap}
              />
            )}

            {transportMode === "CAR" && carRouteLeg && (
              <CarRouteSummaryCard
                carRouteLeg={carRouteLeg}
                onPressKakaoMap={handleOpenKakaoMap}
              />
            )}
          </>
        )}
      </Dropdown>
    </View>
  );
}

export default memo(TimelineItem);
