import { getMyCoursesApi, GetMyCoursesParams } from "@/api/course";
import { useQuery } from "@tanstack/react-query";

export const courseKeys = {
  all: ["courses"] as const,
  me: (params?: GetMyCoursesParams) => [...courseKeys.all, "me", params] as const,
};

export function useMyCoursesQuery(params?: GetMyCoursesParams) {
  return useQuery({
    queryKey: courseKeys.me(params),
    queryFn: () => getMyCoursesApi(params).then((res) => res),
  });
}
