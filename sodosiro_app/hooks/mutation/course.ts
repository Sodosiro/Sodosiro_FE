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
    }: {
      courseId: number;
      contentId: number;
      day: number;
    }) => postCourseGps(courseId, contentId, day),

    onSuccess: (_, variables) => {
      invalidateQueries([["courseDetail", variables.courseId], ["badge"]]);
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
      invalidateQueries([["courses", "UPCOMING"], ["aiQuota"]]);
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
