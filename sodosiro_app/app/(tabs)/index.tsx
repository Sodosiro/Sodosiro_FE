import { CourseSummaryItem } from "@/api/course";
import FestivalSection from "@/components/home/festival/FestivalSection";
import HomeHero from "@/components/home/HomeHero";
import PopularPlacesSection from "@/components/home/popularPlace/PoplularPlacesSection";
import TempCourseSection from "@/components/home/TempCourseSection";
import { COURSE_STATE } from "@/constants/Trip";
import { useCoursesQuery } from "@/hooks/query/course";
import { ScrollView, View } from "react-native";

export default function HomeScreen() {
  const { data } = useCoursesQuery(COURSE_STATE.UPCOMING);

  const tempCourse = data?.data?.courses?.find(
    (course: CourseSummaryItem) => !course.isConfirmed,
  );

  return (
    <ScrollView className={`flex-1`}>
      <View className={`flex-1 flex-col gap-6 bg-white pb-8`}>
        <HomeHero />
        <TempCourseSection tempCourse={tempCourse} />
        <View className={`gap-8`}>
          <PopularPlacesSection />
          <FestivalSection />
        </View>
      </View>
    </ScrollView>
  );
}
