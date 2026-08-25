import { patchNotificationsSetting } from "@/api/notification";
import { invalidateQueries } from "@/util/query/invalidateQueries";
import { useMutation } from "@tanstack/react-query";

export function useNotificationsSettingMutation() {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ type, enabled }: { type: NoticeType; enabled: boolean }) =>
      patchNotificationsSetting(type, enabled),

    onSuccess: (response) => {
      console.log(response.data);
      invalidateQueries([["notificationsSetting"]]);
    },
  });

  return {
    mutate,
    isPending,
  };
}
