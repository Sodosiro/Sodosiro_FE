import { CourseSummaryItem } from "@/api/course";
import { RightIcon } from "@/assets/svgs";
import { COURSE_STATE } from "@/constants/Trip";
import { getSigunguName } from "@/util/region/region";
import { formatTimeAgo } from "@/util/time/time";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import CustomText from "../common/CustomText";

export default function TempCourseSection({
  tempCourse,
}: {
  tempCourse: CourseSummaryItem;
}) {
  return (
    tempCourse && (
      <Pressable
        className={`mx-5 p-4 flex-row gap-1 items-center rounded-xl border border-primary-dark bg-primary-light`}
        onPress={() =>
          router.push({
            pathname: "/trip/timeline",
            params: {
              courseId: tempCourse.courseId,
              courseStatus: Boolean(tempCourse.isConfirmed)
                ? COURSE_STATE.UPCOMING
                : COURSE_STATE.TEMP,
            },
          })
        }
      >
        <View className={`flex-1 gap-1`}>
          <CustomText
            font="title"
            className={`text-primary-dark`}
            numberOfLines={1}
          >
            임시저장된 코스가 있어요!
          </CustomText>
          <View className={`flex-row items-center gap-2`}>
            <CustomText font="body3 tight" className={`text-text-secondary`}>
              {getSigunguName(tempCourse.sigunguCode)}
            </CustomText>
            <View className={`size-1 bg-text-secondary rounded-full`} />
            <CustomText font="body3 tight" className={`text-text-secondary`}>
              {formatTimeAgo(tempCourse.createdAt)} 저장됨
            </CustomText>
          </View>
        </View>
        <RightIcon />
      </Pressable>
    )
  );
}
