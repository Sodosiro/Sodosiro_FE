import { renderToStaticMarkup } from "react-dom/server";
import {
  Accommodation,
  AccommodationMarker,
  Activity,
  ActivityMarker,
  Attraction,
  AttractionMarker,
  Cafe,
  CafeMarker,
  Nature,
  NatureMarker,
  Restaurant,
  RestaurantMarker,
  Shopping,
  ShoppingMarker,
} from "../assets/svgs";

const LIKED_COLOR = "#F8CF43";
const POPULAR_COLOR = "#FF7681";
const DEFAULT_COLOR = "#C4D96A";

export function getMarkerIcon(
  category: CategoryType,
  liked = false,
  isPopular = false,
) {
  const color = liked ? LIKED_COLOR : isPopular ? POPULAR_COLOR : DEFAULT_COLOR;

  const IconMap = {
    activity: Activity,
    attraction: Attraction,
    cafe: Cafe,
    nature: Nature,
    restaurant: Restaurant,
    shopping: Shopping,
    accommodation: Accommodation,
  } satisfies Record<CategoryType, React.ComponentType<{ color: string }>>;

  const Icon = IconMap[category];

  const svg = renderToStaticMarkup(<Icon color={color} />);

  const url = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

  return url;
}

export function getSelectedMarkerIcon(
  category: CategoryType,
  liked = false,
  isPopular = false,
) {
  const color = liked ? LIKED_COLOR : isPopular ? POPULAR_COLOR : DEFAULT_COLOR;

  const IconMap = {
    activity: ActivityMarker,
    attraction: AttractionMarker,
    cafe: CafeMarker,
    nature: NatureMarker,
    restaurant: RestaurantMarker,
    shopping: ShoppingMarker,
    accommodation: AccommodationMarker,
  } satisfies Record<CategoryType, React.ComponentType<{ color: string }>>;

  const Icon = IconMap[category];

  const svg = renderToStaticMarkup(<Icon color={color} />);

  const url = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

  return url;
}
