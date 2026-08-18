import { CalendarMiniIcon, PinMiniIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import KeywordBadgeList from "@/components/common/keywordBadge/KeywordBadgeList";
import InfoChip from "@/components/place/InfoChip";
import { getSeasonImage } from "@/util/festival/festival";
import { formatDate } from "@/util/time/time";
import { useState } from "react";
import { Image, Pressable, View, type LayoutChangeEvent } from "react-native";
import DdayBadge from "./DdayBadge";

export default function FestivalItem({
  festival,
  onPress,
}: {
  festival: FestivalType;
  onPress: () => void;
}) {
  const { imageUrl, regionName, title, description, startDate, endDate, tags } =
    festival;

  const [contentHeight, setContentHeight] = useState(0);

  const imageSource = imageUrl ? { uri: imageUrl } : getSeasonImage(startDate);

  const handleContentLayout = (event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;

    if (height !== contentHeight) {
      setContentHeight(height);
    }
  };

  return (
    <View className="flex-row gap-3 items-stretch">
      {/* 이미지 */}
      <Pressable
        onPress={onPress}
        style={{
          width: (contentHeight * 3) / 4 || 0,
          height: contentHeight || 0,
        }}
      >
        {contentHeight > 0 && (
          <Image
            source={imageSource}
            className="w-full h-full rounded-xl"
            resizeMode="cover"
          />
        )}

        <DdayBadge
          className="absolute bottom-3 left-3"
          startDate={startDate}
          endDate={endDate}
        />
      </Pressable>

      {/* 내용 */}
      <View className="flex-1 gap-3 py-1" onLayout={handleContentLayout}>
        <Pressable onPress={onPress} className="gap-3">
          {/* 제목 */}
          <CustomText font="title" numberOfLines={1}>
            {title}
          </CustomText>

          {/* 장소 / 날짜 */}
          <View className="gap-1.5">
            <InfoChip
              icon={<PinMiniIcon width={14} color="#888888" />}
              text={regionName}
            />

            <InfoChip
              icon={<CalendarMiniIcon width={14} color="#888888" />}
              text={formatDate(startDate, endDate)}
            />
          </View>

          {/* 설명 - 최대 2줄 */}
          <CustomText
            font="body3"
            className="text-text-muted"
            numberOfLines={2}
          >
            {description}
          </CustomText>
        </Pressable>

        {/* 태그 */}
        <KeywordBadgeList keywords={tags} />
      </View>
    </View>
  );
}
