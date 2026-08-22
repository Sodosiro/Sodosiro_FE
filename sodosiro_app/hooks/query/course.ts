import { getCoursesApi } from "@/api/course";
import { getFeedCandidatesApi } from "@/api/feed";
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
