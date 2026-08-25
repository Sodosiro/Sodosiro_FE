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
