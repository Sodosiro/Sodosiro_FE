import { FAVORITE_PLACES } from "@/mocks/places";
import { create } from "zustand";

export interface LikePlace {
  id: number;
  imageSource: any;
  title: string;
  desc: string;
  createdAt: string;
}

interface LikeStore {
  likePlaces: LikePlace[];

  addLike: (place: LikePlace) => void;
  removeLike: (id: number) => void;
  removeLikes: (ids: number[]) => void;
  toggleLike: (place: LikePlace) => void;
  isLike: (id: number) => boolean;
}

export const useLikeStore = create<LikeStore>((set, get) => ({
  likePlaces: FAVORITE_PLACES,

  addLike: (place) =>
    set((state) => ({
      likePlaces: [...state.likePlaces, place],
    })),

  removeLike: (id) =>
    set((state) => ({
      likePlaces: state.likePlaces.filter((place) => place.id !== id),
    })),

  removeLikes: (ids) =>
    set((state) => ({
      likePlaces: state.likePlaces.filter((place) => !ids.includes(place.id)),
    })),

  toggleLike: (place) => {
    const { likePlaces } = get();

    if (likePlaces.some((item) => item.id === place.id)) {
      set({
        likePlaces: likePlaces.filter((item) => item.id !== place.id),
      });
    } else {
      set({
        likePlaces: [
          ...likePlaces,
          {
            ...place,
            createdAt: new Date().toISOString(),
          },
        ],
      });
    }
  },

  isLike: (id) => get().likePlaces.some((place) => place.id === id),
}));
