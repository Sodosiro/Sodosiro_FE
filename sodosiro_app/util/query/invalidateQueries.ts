import { queryClient } from "@/lib/queryClient";

export const invalidateQueries = async (queryKeys: any[]) => {
  await Promise.all(
    queryKeys.map((queryKey) =>
      queryClient.invalidateQueries({
        queryKey,
      }),
    ),
  );
};
