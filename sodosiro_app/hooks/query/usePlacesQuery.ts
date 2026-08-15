import { getPlacesApi } from "@/api/place";
import { CategoryToNumber } from "@/util/place/category";
import { useQuery } from "@tanstack/react-query";

export function usePlacesQuery(
  category: CategoryType,
  sort?: "ALL" | "DEFAULT" | "POPULAR",
  size: number = 20,
) {
  return useQuery({
    queryKey: ["places", category, sort, size],
    queryFn: () =>
      getPlacesApi({
        size: size,
        category: category === "all" ? undefined : [CategoryToNumber[category]],
      }),
  });
}
