import { View } from "react-native";
import SectionTitle from "../SectionTitle";
import FestivalList from "./FestivalList";

export default function FestivalSection() {
  return (
    <View className={`px-5 gap-3`}>
      <SectionTitle title={"다가오는 강원 축제"} onPress={() => {}}/>
      <FestivalList/>
    </View>
  )
}