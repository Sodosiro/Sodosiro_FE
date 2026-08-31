import { useRef } from "react";

export function useClusterer() {
  const clustererRef = useRef<kakao.maps.MarkerClusterer | null>(null);
  const clustersRef = useRef<kakao.maps.Cluster[]>([]);

  const allMarkersRef = useRef<Set<kakao.maps.Marker>>(new Set());

  // 현재 낱개로 보이는 마커들
  const boundMarkersRef = useRef<Set<kakao.maps.Marker>>(new Set());

  const create = (map: kakao.maps.Map) => {
    if (clustererRef.current) {
      clustererRef.current.clear();
    }

    clustersRef.current = [];

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

        const bounds = map.getBounds();

        // 현재 바운드 된 마커 전체
        boundMarkersRef.current = new Set(
          [...allMarkersRef.current].filter((marker) =>
            bounds.contain(marker.getPosition()),
          ),
        );
      },
    );

    clustererRef.current = clusterer;
  };

  /**
   * 현재 클러스터의 마커를 모두 교체
   */
  const setMarkers = (markers: kakao.maps.Marker[]) => {
    if (!clustererRef.current) return;

    clustersRef.current = [];
    clustererRef.current?.clear();
    clustererRef.current?.addMarkers(markers);

    allMarkersRef.current = new Set(markers);
  };

  const getClusterByMarker = (marker: kakao.maps.Marker) => {
    return clustersRef.current.find((cluster) =>
      cluster.getMarkers().some((clusterMarker) => clusterMarker === marker),
    );
  };

  const isMarkerBounding = (marker: kakao.maps.Marker) => {
    return boundMarkersRef.current.has(marker);
  };

  const isMarkerRendering = (marker: kakao.maps.Marker) => {
    return allMarkersRef.current.has(marker);
  };

  /**
   * 클러스터러가 관리 중인 마커를 전부 숨김
   *
   * marker.setMap(null)을 직접 호출하지 않고
   * 클러스터러를 통해 제거하므로 내부 상태와 어긋나지 않는다.
   */
  const clear = () => {
    clustererRef.current?.clear();
    clustersRef.current = [];
  };

  return {
    create,
    setMarkers,
    getClusterByMarker,
    isMarkerRendering,
    isMarkerBounding,
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
