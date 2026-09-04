import { getAiQuota, getCourseDetail, getCoursesApi } from "@/api/course";
import { getFeedCandidatesApi } from "@/api/feed";
import { getAlternativeSpotsApi } from "@/api/place";
import { useQuery } from "@tanstack/react-query";

export function useCoursesQuery(status: TripStatus) {
  return useQuery({
    queryKey: ["courses", status],
    queryFn: () => getCoursesApi(status),
  });
}

export function useCoursePlacesQuery(courseId: number | undefined) {
  return useQuery({
    queryKey: ["coursePlaces", courseId],
    queryFn: () => getFeedCandidatesApi(courseId!),
    enabled: !!courseId,
  });
}

export const useCourseDetailQuery = (courseId: number) => {
  return useQuery({
    queryKey: ["courseDetail", courseId],
    queryFn: () => getCourseDetail(courseId!),
    enabled: !!courseId,
  });
};

export function useAlternativeSpotsQuery(contentId?: number | string) {
  return useQuery({
    queryKey: ["alternativeSpots", contentId],
    queryFn: () => getAlternativeSpotsApi({ contentId: contentId! }),
    enabled: !!contentId,
  });
}

export function useAiQuotaQuery() {
  return useQuery({
    queryKey: ["aiQuota"],
    queryFn: () => getAiQuota(),
  });
}
