type CategoryType = 'activity' | 'attraction' | 'cafe' | 'favorite' | 'nature' | 'popular' | 'restaurant' | 'shopping' | 'culture'

type PlaceType = {
  lat: number;
  lng: number;
  category: CategoryType;
}
