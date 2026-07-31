import { ScrollView, View } from "react-native";
import KeywordBadge from "./KeywordBadge";

export default function KeywordBadgeList({
  keywords,
  gap = 4,
}: {
  keywords: string[];
  gap?: number;
}) {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: gap }}
      >
        {keywords.map((keyword, index) => (
          <KeywordBadge key={index} title={keyword} />
        ))}
      </ScrollView>
    </View>
  );
}
