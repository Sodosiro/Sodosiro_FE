import { CalendarMiniIcon, PinMiniIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import KeywordBadgeList from "@/components/common/keywordBadge/KeywordBadgeList";
import InfoChip from "@/components/place/InfoChip";
import { getFestivalSeasonImage } from "@/util/festival/festival";
import { formatDate } from "@/util/time/time";
import { Image, LayoutChangeEvent, Pressable, View } from "react-native";
import DdayBadge from "./DdayBadge";
export default function FestivalItem({
  festival,
  onPress,
  contentHeight,
  onLayout,
}: {
  festival?: FestivalType;
  onPress?: () => void;
  contentHeight?: number;
  onLayout?: (event: LayoutChangeEvent) => void;
}) {
  const { imageUrl, regionName, title, description, startDate, endDate, tags } =
    festival ?? {
      imageUrl: " ",
      regionName: " ",
      title: " ",
      description: "\n",
      startDate: new Date(),
      endDate: new Date(),
      tags: ["tag"],
    };

  const imageSource = imageUrl
    ? { uri: imageUrl }
    : getFestivalSeasonImage(startDate);

  return (
    <View
      className={`flex-row gap-3 items-stretch ${onLayout && `absolute opacity-0 pointer-events-none`}`}
    >
      {/* 이미지 */}
      {contentHeight && (
        <Pressable
          onPress={onPress}
          style={{
            width: (contentHeight * 3) / 4,
            height: contentHeight,
          }}
        >
          <Image
            source={imageSource}
            className="w-full h-full rounded-xl"
            resizeMode="cover"
          />

          <DdayBadge
            className="absolute bottom-3 left-3"
            startDate={startDate}
            endDate={endDate}
          />
        </Pressable>
      )}

      {/* 내용 */}
      <View className="flex-1 gap-3 py-1" onLayout={onLayout}>
        <Pressable onPress={onPress} className="gap-3">
          <CustomText font="title" numberOfLines={1}>
            {title}
          </CustomText>

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

          <CustomText
            font="body3"
            className="text-text-muted"
            numberOfLines={2}
          >
            {description}
          </CustomText>
        </Pressable>

        <KeywordBadgeList keywords={tags} />
      </View>
    </View>
  );
}
