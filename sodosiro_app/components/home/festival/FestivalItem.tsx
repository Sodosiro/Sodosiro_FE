import { CalendarMiniIcon, PinMiniIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import KeywordBadgeList from "@/components/common/keywordBadge/KeywordBadgeList";
import InfoChip from "@/components/place/InfoChip";
import { getSeasonImage } from "@/util/festival/festival";
import { formatDate } from "@/util/time/time";
import { useState } from "react";
import {
  Image,
  Pressable,
  View,
  type LayoutChangeEvent,
  type TextLayoutEvent,
} from "react-native";
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

  const [descriptionHeight, setDescriptionHeight] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);

  const imageSource = imageUrl ? { uri: imageUrl } : getSeasonImage(startDate);

  // description 영역의 실제 높이
  const handleDescriptionLayout = (event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;

    if (height !== descriptionHeight) {
      setDescriptionHeight(height);
    }
  };

  // 실제 텍스트 한 줄의 높이
  const handleTextLayout = (event: TextLayoutEvent) => {
    const lines = event.nativeEvent.lines;

    if (lines.length === 0) return;

    const height = lines[0].height;

    if (height !== lineHeight) {
      setLineHeight(height);
    }
  };

  const numberOfLines =
    descriptionHeight > 0 && lineHeight > 0
      ? Math.max(2, Math.floor(descriptionHeight / lineHeight))
      : undefined;

  return (
    <Pressable className="flex-row gap-3 h-50" onPress={onPress}>
      {/* 이미지 */}
      <View>
        <Image source={imageSource} className="h-50 aspect-3/4 rounded-xl" />

        <DdayBadge
          className="absolute bottom-3 left-3"
          startDate={startDate}
          endDate={endDate}
        />
      </View>

      {/* 내용 */}
      <View className="gap-2 flex-1 py-1">
        {/* 제목 */}
        <CustomText font="title" numberOfLines={1}>
          {title}
        </CustomText>

        {/* 장소 / 날짜 */}
        <View className="gap-2">
          <InfoChip
            icon={<PinMiniIcon width={14} color="#888888" />}
            text={regionName}
          />

          <InfoChip
            icon={<CalendarMiniIcon width={14} color="#888888" />}
            text={formatDate(startDate, endDate)}
          />
        </View>

        {/* 설명 */}
        <View
          className="flex-1 flex-row overflow-hidden"
          onLayout={handleDescriptionLayout}
        >
          <CustomText
            font="body3"
            className="flex-1 text-text-muted"
            numberOfLines={numberOfLines}
            onTextLayout={handleTextLayout}
          >
            {description}
          </CustomText>
        </View>

        {/* 태그 */}
        <View>
          <KeywordBadgeList keywords={tags} />
        </View>
      </View>
    </Pressable>
  );
}
