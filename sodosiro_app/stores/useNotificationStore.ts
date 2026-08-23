import { create } from "zustand";

interface NotificationStore {
  hasUnreadNotification: boolean;
  setHasUnreadNotification: (value: boolean) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  hasUnreadNotification: false,
  setHasUnreadNotification(value) {
    set({ hasUnreadNotification: value });
  },
}));
