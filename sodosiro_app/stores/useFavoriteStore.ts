import { FAVORITE_PLACES } from "@/mocks/places";
import { create } from "zustand";

export interface FavoritePlace {
  id: number;
  imageSource: any;
  title: string;
  desc: string;
  createdAt: string;
}

interface FavoriteStore {
  favoritePlaces: FavoritePlace[];

  addFavorite: (place: FavoritePlace) => void;
  removeFavorite: (id: number) => void;
  removeFavorites: (ids: number[]) => void;
  toggleFavorite: (place: FavoritePlace) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
  favoritePlaces: FAVORITE_PLACES,

  addFavorite: (place) =>
    set((state) => ({
      favoritePlaces: [...state.favoritePlaces, place],
    })),

  removeFavorite: (id) =>
    set((state) => ({
      favoritePlaces: state.favoritePlaces.filter((place) => place.id !== id),
    })),

  removeFavorites: (ids) =>
    set((state) => ({
      favoritePlaces: state.favoritePlaces.filter(
        (place) => !ids.includes(place.id),
      ),
    })),

  toggleFavorite: (place) => {
    const { favoritePlaces } = get();

    if (favoritePlaces.some((item) => item.id === place.id)) {
      set({
        favoritePlaces: favoritePlaces.filter((item) => item.id !== place.id),
      });
    } else {
      set({
        favoritePlaces: [
          ...favoritePlaces,
          {
            ...place,
            createdAt: new Date().toISOString(),
          },
        ],
      });
    }
  },

  isFavorite: (id) => get().favoritePlaces.some((place) => place.id === id),
}));
