type RouteInfo = {
  origin: {
    x: number;
    y: number;
  };
  destination: {
    name: string;
    x: number;
    y: number;
  };
  waypoints: {
    name: string;
    x: number;
    y: number;
  }[];
  duration: number;
  bound: {
    min_x: number;
    min_y: number;
    max_x: number;
    max_y: number;
  };
  sections: {
    roads: {
      name: string;
      distance: number;
      duration: number;
      traffic_speed: number;
      traffic_state: number;
      vertexes: number[];
    }[];
  }[];
};
