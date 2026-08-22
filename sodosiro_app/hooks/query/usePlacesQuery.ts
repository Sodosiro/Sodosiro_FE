import { getPlacesApi } from "@/api/place";
import { useAuthStore } from "@/stores/useAuthStore";
import { CategoryToNumber } from "@/util/place/category";
import { useQuery } from "@tanstack/react-query";

export function usePlacesQuery(
  category: CategoryType,
  sort?: "ALL" | "DEFAULT" | "POPULAR",
  size: number = 20,
) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: ["places", category, sort, size],
    queryFn: () =>
      getPlacesApi({
        size: size,
        category: category === "all" ? undefined : [CategoryToNumber[category]],
        sort,
      }),
    enabled: isAuthenticated,
  });
}
