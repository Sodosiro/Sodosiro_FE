import { Activity, ActivityMarker, Attraction, AttractionMarker, Cafe, CafeMarker, Favorite, FavoriteMarker, Nature, NatureMarker, Popular, PopularMarker, Restaurant, RestaurantMarker, Shopping, ShoppingMarker } from "../assets/svgs";

export function getMarkerIcon(category: CategoryType): string {
  switch (category) {
    case 'activity':
      return Activity
      break;

    case 'attraction':
      return Attraction
      break;

    case 'cafe':
      return Cafe
      break;

    case 'favorite':
      return Favorite
      break;

    case 'nature':
      return Nature
      break;

    case 'popular':
      return Popular
      break;

    case 'restaurant':
      return Restaurant
      break;

    case 'shopping':
      return Shopping
      break;
  }
}


export function getSelectedMarkerIcon(category: CategoryType): string | undefined {
  switch (category) {
    case 'activity':
      return ActivityMarker
      break;

    case 'attraction':
      return AttractionMarker
      break;

    case 'cafe':
      return CafeMarker
      break;

    case 'favorite':
      return FavoriteMarker
      break;

    case 'nature':
      return NatureMarker
      break;

    case 'popular':
      return PopularMarker
      break;

    case 'restaurant':
      return RestaurantMarker
      break;

    case 'shopping':
      return ShoppingMarker
      break;
  }
}