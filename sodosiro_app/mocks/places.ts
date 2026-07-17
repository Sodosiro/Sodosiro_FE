export type CategoryType =
  | "activity"
  | "attraction"
  | "cafe"
  | "favorite"
  | "nature"
  | "popular"
  | "restaurant"
  | "shopping";

export type PlaceType = {
  id: number;
  lat: number;
  lng: number;
  category: CategoryType;
};

const categories: CategoryType[] = [
  "activity",
  "attraction",
  "cafe",
  "favorite",
  "nature",
  "popular",
  "restaurant",
  "shopping",
];

const center = {
  lat: 37.5665,
  lng: 126.978,
};

export const Places: PlaceType[] = Array.from(
  { length: 500 },
  (_, index) => ({
    id: index + 1,
    lat:
      center.lat +
      (Math.random() - 0.5) * 0.06,
    lng:
      center.lng +
      (Math.random() - 0.5) * 0.06,
    category:
      categories[
        Math.floor(
          Math.random() * categories.length
        )
      ],
  })
);