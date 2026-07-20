type CategoryType = 'all' | 'activity' | 'attraction' | 'cafe' | 'nature' | 'restaurant' | 'shopping' | 'culture'

type PlaceType = {
  id: number;
  lat: number;
  lng: number;
  category: CategoryType;
  favorite: boolean;
  popular: boolean;
};
