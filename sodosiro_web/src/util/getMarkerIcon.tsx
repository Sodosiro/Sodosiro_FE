import { renderToStaticMarkup } from "react-dom/server";
import { Activity, ActivityMarker, Attraction, AttractionMarker, Cafe, CafeMarker, Culture, CultureMarker, Nature, NatureMarker, Restaurant, RestaurantMarker, Shopping, ShoppingMarker } from "../assets/svgs";

export function getMarkerIcon(
  category: CategoryType,
  favorite=false,
  popular=false,
) {

  const color = favorite ? "#ECB76E" : popular ? "#6AD9CA" : "#C4D96A";

  const IconMap = {
    activity: Activity,
    attraction: Attraction,
    cafe: Cafe,
    nature: Nature,
    restaurant: Restaurant,
    shopping: Shopping,
    culture: Culture,
  } satisfies Record<CategoryType, React.ComponentType<{ color: string }>>;

  const Icon = IconMap[category];

  const svg = renderToStaticMarkup(
    <Icon color={color} />
  );

  const url = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

  return url;
}


export function getSelectedMarkerIcon(
  category: CategoryType,
  favorite=false,
  popular=false,
) {

  const color = favorite ? "#ECB76E" : popular ? "#6AD9CA" : "#C4D96A";

  const IconMap = {
    activity: ActivityMarker,
    attraction: AttractionMarker,
    cafe: CafeMarker,
    nature: NatureMarker,
    restaurant: RestaurantMarker,
    shopping: ShoppingMarker,
    culture: CultureMarker,
  } satisfies Record<CategoryType, React.ComponentType<{ color: string }>>;

  const Icon = IconMap[category];

  const svg = renderToStaticMarkup(
    <Icon color={color} />
  );

  const url = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

  return url;
}