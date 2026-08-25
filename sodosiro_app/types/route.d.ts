type RoutePoint = {
  longitude: number;
  latitude: number;
};

type RouteInfoBase = {
  origin: {
    x: number;
    y: number;
    index: number;
  };
  destination: {
    x: number;
    y: number;
    index: number;
  };
  bound: {
    min_x: number;
    min_y: number;
    max_x: number;
    max_y: number;
  };
};

type CarRouteInfo = RouteInfoBase & {
  type: "CAR";
  paths: RoutePoint[];
};

type TransitRouteInfo = RouteInfoBase & {
  type: "TRANSIT";
  routes: {
    type: "WALKING" | "BUS";
    path: RoutePoint[];
  }[];
};

type RouteInfo = CarRouteInfo | TransitRouteInfo;

/**
 * 대중교통 세부 수단 타입 (SUBWAY 확장)
 */
type TransitStepType = "WALKING" | "BUS";

/**
 * 대중교통 개별 Step 경로 객체
 */
type TransitRouteStep = {
  type: TransitStepType;
  path: RoutePoint[];
};

/**
 * SUBWAY를 포함할 수 있는 확장된 대중교통 경로 타입
 */
type TransitRouteInfoExtended = RouteInfoBase & {
  type: "TRANSIT";
  routes: TransitRouteStep[];
};

/**
 * 확장형 전체 경로 정보 union 타입
 */
type RouteInfoExtended = CarRouteInfo | TransitRouteInfoExtended;
