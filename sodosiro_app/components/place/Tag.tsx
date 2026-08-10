import { tagStyle } from "@/styles/Tag";
import { CategoryMap } from "@/util/place/category";
import { View } from "react-native";
import CustomText from "../common/CustomText";

export default function Tag({
  category,
  rankTag,
}: {
  category?: CategoryType;
  rankTag?: string;
}) {
  return (
    <View className={`flex-row`}>
      <View
        className={`${tagStyle} ${category ? `bg-bg-subtle` : `bg-[#FCF5DB]`} `}
      >
        <CustomText
          font="body3 tight"
          className={`${category ? `` : `text-[#DE9624]`}`}
        >
          {category ? CategoryMap[category] : rankTag}
        </CustomText>
      </View>
    </View>
  );
}
