type CategoryType = 'activity' | 'attraction' | 'cafe' | 'favorite' | 'nature' | 'popular' | 'restaurant' | 'shopping'

type PlaceType = {
  lat: number;
  lng: number;
  category: CategoryType;
}
