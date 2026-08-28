import {
  confirmCourseApi,
  CourseRecommendationRequest,
  deleteCourse,
  postCourseGps,
  postCourseRecommendationsApi,
} from "@/api/course";
import { invalidateQueries } from "@/util/query/invalidateQueries";
import { useMutation } from "@tanstack/react-query";

export function useCourseGpsMutation() {
  const { mutate, mutateAsync, isPending } = useMutation({
    mutationFn: ({
      courseId,
      contentId,
      day,
      latitude,
      longitude,
    }: {
      courseId: number;
      contentId: number;
      day: number;
      latitude: number;
      longitude: number;
    }) => postCourseGps(courseId, contentId, day, latitude, longitude),

    onSuccess: (_, variables) => {
      invalidateQueries([["courseDetail", variables.contentId], ["aiQuota"]]);
    },
  });

  return {
    mutate,
    mutateAsync,
    isPending,
  };
}

export function useCourseRecommendationsMutation() {
  const { mutate, mutateAsync, isPending } = useMutation({
    mutationFn: (body: CourseRecommendationRequest) =>
      postCourseRecommendationsApi(body),
    onSuccess: () => {
      invalidateQueries([["courses", "UPCOMING"]]);
    },
  });

  return {
    mutate,
    mutateAsync,
    isPending,
  };
}

export const useDeleteCourseMutation = () => {
  return useMutation({
    mutationFn: (courseId: number) => deleteCourse(courseId),
    onSuccess: () => {
      invalidateQueries([["courses"]]);
    },
    onError: (error) => {
      console.error("코스 삭제 실패:", error);
    },
  });
};

export function useConfirmCourseMutation() {
  return useMutation({
    mutationFn: (body: { courseId: number }) => confirmCourseApi(body),
    onSuccess: (_, variables) => {
      invalidateQueries([["courseDetail", variables.courseId], ["courses"]]);
    },
  });
}
