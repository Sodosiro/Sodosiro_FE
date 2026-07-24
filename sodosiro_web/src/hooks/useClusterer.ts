import { useRef } from "react";

export function useClusterer() {
  const clustererRef = useRef<kakao.maps.MarkerClusterer | null>(null);

  const create = (map: kakao.maps.Map) => {
    clustererRef.current = new kakao.maps.MarkerClusterer({
      map,
      averageCenter: true,
      minLevel: 5,
      calculator: [10, 50],
      texts: (count) => `${count}`,
      styles: ClusterStyles,
    });
  };

  const setMarkers = (markers: kakao.maps.Marker[]) => {
    if (!clustererRef.current) return;

    clustererRef.current.clear();
    clustererRef.current.addMarkers(markers);
  };

  const clear = () => {
    clustererRef.current?.clear();
  };

  return {
    create,
    setMarkers,
    clear,
  };
}

const ClusterStyles = [
  {
    width: "32px",
    height: "32px",
    opacity: 0.8,
    background: "#C4D96A",
    borderRadius: "999px",
    color: "#1A1A1A",
    fontSize: "14px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 0 4px #C3D96A50, 0 0 0 8px #C3D96A30",
    textShadow: `
      -0.5px -0.5px 0 white,
      0.5px -0.5px 0 white,
      -0.5px 0.5px 0 white,
      0.5px 0.5px 0 white`,
  },
  {
    width: "42px",
    height: "42px",
    opacity: 0.8,
    background: "#A9C92D",
    borderRadius: "999px",
    color: "#1A1A1A",
    fontSize: "16px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 0 5px #A9C92D50, 0 0 0 10px #A9C92D30",
    textShadow: `
      -0.5px -0.5px 0 white,
      0.5px -0.5px 0 white,
      -0.5px 0.5px 0 white,
      0.5px 0.5px 0 white`,
  },
  {
    width: "52px",
    height: "52px",
    opacity: 0.8,
    background: "#7E9432",
    borderRadius: "999px",
    color: "#1A1A1A",
    fontSize: "18px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 0 6px #7E943250, 0 0 0 12px #7E943230",
    textShadow: `
      -1px -1px 0 white,
      1px -1px 0 white,
      -1px 1px 0 white,
      1px 1px 0 white`,
  },
];
