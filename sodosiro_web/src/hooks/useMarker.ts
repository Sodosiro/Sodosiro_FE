import getLabel from "../components/Marker";
import { getSelectedMarkerIcon } from "../util/getMarkerIcon";

export function useMarker() {
  const create = (map: kakao.maps.Map, place: PlaceType) => {
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(place.lat, place.lng),
      image: new kakao.maps.MarkerImage(
        getSelectedMarkerIcon(place.category),
        new kakao.maps.Size(40, 40),
      ),
      zIndex: 0,
    });

    marker.setMap(map);

    const overlay = new kakao.maps.CustomOverlay({
      position: marker.getPosition(),
      content: getLabel(place.title),
      yAnchor: 0,
    });

    overlay.setMap(map);

    map.setCenter(new kakao.maps.LatLng(place.lat, place.lng));
    map.setDraggable(false);
    map.setZoomable(false);

    return {
      marker,
      overlay,
    };
  };

  return {
    create,
  };
}
