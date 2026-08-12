import { create } from "zustand";

interface ExploreStore {
  keyword: string;
  searchResult: PlaceType[] | null;
  selectedCategory: CategoryType;
  allPlaces: PlaceType[] | null;

  selectedPlaceId: number | null;
  setSelectedPlaceId: (placeId: number | null) => void;

  setKeyword: (keyword: string) => void;
  setSearchResult: (results: PlaceType[]) => void;
  setSelectedCategory: (category: CategoryType) => void;
  clearSearchResult: () => void;
  setAllPlaces: (places: PlaceType[] | null) => void;
  updatePlaceLike: (contentId: number, liked: boolean) => void;
  findPlaceById: (contentId: number) => PlaceType | null;
}

export const useExploreStore = create<ExploreStore>((set, get) => ({
  keyword: "",
  searchResult: null,
  selectedCategory: "all",
  allPlaces: null,

  setKeyword: (keyword) => set({ keyword }),
  setSearchResult: (results) => set({ searchResult: results }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  clearSearchResult: () => set({ keyword: "", searchResult: null }),
  setAllPlaces: (places: PlaceType[] | null) => set({ allPlaces: places }),

  selectedPlaceId: null,
  setSelectedPlaceId: (place) => set({ selectedPlaceId: place }),
  updatePlaceLike: (contentId, liked) =>
    set((state) => {
      const updatePlace = (place: PlaceType) =>
        place.contentId === contentId
          ? {
              ...place,
              liked,
              likeCount: liked ? place.likeCount + 1 : place.likeCount - 1,
            }
          : place;

      return {
        allPlaces: state.allPlaces?.map(updatePlace) ?? null,
        searchResult: state.searchResult?.map(updatePlace) ?? null,
      };
    }),
  findPlaceById: (contentId) =>
    get().allPlaces?.find((place) => place.contentId === contentId) ?? null,
}));
