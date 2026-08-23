import {
  CourseRecommendationRequest,
  deleteCourse,
  postCourseRecommendationsApi,
} from "@/api/course";
import { invalidateQueries } from "@/util/query/invalidateQueries";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCourseRecommendationsMutation() {
  const { mutate, mutateAsync, isPending } = useMutation({
    mutationFn: (body: CourseRecommendationRequest) => postCourseRecommendationsApi(body),

    onSuccess: () => {
      // 코스 생성 성공 시 관련 리스트/조회 쿼리 캐시 무효화
      invalidateQueries([["courses"]]);
    },
  });

  return {
    mutate,
    mutateAsync,
    isPending,
  };
}

export const useDeleteCourseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseId: number) => deleteCourse(courseId),
    onSuccess: () => {
      // 코스 목록 데이터 갱신 (사용 중인 코스 목록 queryKey로 변경해 주세요)
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      console.error("코스 삭제 실패:", error);
    },
  });
};
