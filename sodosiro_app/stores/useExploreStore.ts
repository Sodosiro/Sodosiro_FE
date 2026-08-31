import { create } from "zustand";

interface ExploreStore {
  keyword: string;
  searchResult: PlaceType[] | null;
  selectedCategory: CategoryType;
  onlySmallTown: boolean;
  allPlaces: PlaceType[] | null;

  isPlacesPending: boolean;
  setIsPlacesPending: (value: boolean) => void;

  setKeyword: (keyword: string) => void;
  setSearchResult: (results: PlaceType[]) => void;
  setSelectedCategory: (category: CategoryType) => void;
  setOnlySmallTown: (value: boolean) => void;
  clearSearchResult: () => void;
  setAllPlaces: (places: PlaceType[] | null) => void;

  selectedPlaceId: number | null;
  setSelectedPlaceId: (placeId: number | null) => void;

  updatePlaceLikeOptimistic: (contentIds: number[]) => void;
  updatePlaceLike: (
    items: {
      contentId: number;
      liked: boolean;
      likeCount: number;
    }[],
  ) => void;

  findPlaceById: (contentId: number) => PlaceType | null;
}

export const useExploreStore = create<ExploreStore>((set, get) => ({
  keyword: "",
  searchResult: null,
  selectedCategory: "all",
  onlySmallTown: false,
  allPlaces: null,

  isPlacesPending: true,
  setIsPlacesPending(value) {
    set({ isPlacesPending: value });
  },

  setKeyword: (keyword) => set({ keyword }),
  setSearchResult: (results) => set({ searchResult: results }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setOnlySmallTown: (value) => set({ onlySmallTown: value }),
  clearSearchResult: () => set({ keyword: "", searchResult: null }),
  setAllPlaces: (places) => set({ allPlaces: places }),

  selectedPlaceId: null,
  setSelectedPlaceId: (placeId) => set({ selectedPlaceId: placeId }),

  updatePlaceLikeOptimistic: (contentIds) =>
    set((state) => {
      const contentIdSet = new Set(contentIds);

      const updatePlace = (place: PlaceType) => {
        if (!contentIdSet.has(place.contentId)) {
          return place;
        }

        return {
          ...place,
          liked: !place.liked,
          likeCount: place.liked
            ? Math.max(0, place.likeCount - 1)
            : place.likeCount + 1,
        };
      };

      return {
        allPlaces: state.allPlaces?.map(updatePlace) ?? null,
        searchResult: state.searchResult?.map(updatePlace) ?? null,
      };
    }),
  updatePlaceLike: (items) =>
    set((state) => {
      const likeMap = new Map(items.map((item) => [item.contentId, item]));

      const updatePlace = (place: PlaceType) => {
        const like = likeMap.get(place.contentId);

        if (!like) {
          return place;
        }

        return {
          ...place,
          liked: like.liked,
          likeCount: like.likeCount,
        };
      };

      return {
        allPlaces: state.allPlaces?.map(updatePlace) ?? null,
        searchResult: state.searchResult?.map(updatePlace) ?? null,
      };
    }),

  findPlaceById: (contentId) =>
    get().allPlaces?.find((place) => place.contentId === contentId) ?? null,
}));
