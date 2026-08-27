export const getBoundsCenter = (places: PlaceType[]) => {
  if (!places.length) return null;

  const lats = places.map((place) => place.mapY);
  const lngs = places.map((place) => place.mapX);

  return {
    latitude: (Math.min(...lats) + Math.max(...lats)) / 2,
    longitude: (Math.min(...lngs) + Math.max(...lngs)) / 2,
  };
};
