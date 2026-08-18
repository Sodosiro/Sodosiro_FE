import { useRef } from "react";

export function useClusterer() {
  const clustererRef = useRef<kakao.maps.MarkerClusterer | null>(null);
  const clustersRef = useRef<kakao.maps.Cluster[]>([]);

  const create = (map: kakao.maps.Map) => {
    if (clustererRef.current) {
      clustererRef.current.clear();
    }

    const clusterer = new kakao.maps.MarkerClusterer({
      map,
      averageCenter: true,
      minLevel: 5,
      calculator: [20, 100],
      texts: (count) => `${count}`,
      styles: ClusterStyles,
    });

    kakao.maps.event.addListener(
      clusterer,
      "clustered",
      (clusters: kakao.maps.Cluster[]) => {
        clustersRef.current = clusters;
      },
    );

    clustererRef.current = clusterer;
  };

  const setMarkers = (markers: kakao.maps.Marker[]) => {
    if (!clustererRef.current) return;

    clustererRef.current.clear();
    clustererRef.current.addMarkers(markers);
  };

  const getClusterByMarker = (marker: kakao.maps.Marker) => {
    return clustersRef.current.find((cluster) =>
      cluster.getMarkers().some((clusterMarker) => clusterMarker === marker),
    );
  };

  const clear = () => {
    clustererRef.current?.clear();
    clustersRef.current = [];
  };

  return {
    create,
    setMarkers,
    getClusterByMarker,
    clear,
  };
}

const ClusterStyles = [
  {
    width: "48px",
    height: "52px",
    backgroundImage: 'url("/cluster.svg")',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "48px 52px",

    color: "#1A1A1A",
    fontSize: "14px",
    fontWeight: "bold",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    userSelect: "none",
    opacity: 0.8,
  },
  {
    width: "64px",
    height: "70px",
    backgroundImage: 'url("/cluster.svg")',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "64px 70px",

    color: "#1A1A1A",
    fontSize: "15px",
    fontWeight: "bold",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    userSelect: "none",
    opacity: 0.8,
  },
  {
    width: "80px",
    height: "87px",
    backgroundImage: 'url("/cluster.svg")',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "80px 87px",

    color: "#1A1A1A",
    fontSize: "16px",
    fontWeight: "bold",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    userSelect: "none",
    opacity: 0.8,
  },
];
