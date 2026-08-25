import { CourseDetailResponse } from "@/api/course";

export function calculateBounds(paths: RoutePoint[]) {
  if (paths.length === 0) {
    return {
      min_x: 0,
      min_y: 0,
      max_x: 0,
      max_y: 0,
    };
  }

  const longitudes = paths.map((point) => point.longitude);
  const latitudes = paths.map((point) => point.latitude);

  const min_x = Math.min(...longitudes);
  const min_y = Math.min(...latitudes);
  const max_x = Math.max(...longitudes);
  const max_y = Math.max(...latitudes);

  return {
    min_x: min_x,
    min_y: min_y,
    max_x: max_x,
    max_y: max_y,
  };
}

export function createRouteInfo(
  course: CourseDetailResponse,
  dayIndex: number,
  spotIndex: number,
): RouteInfo | null {
  // 현재 일차
  const day = course.days?.[dayIndex];

  if (!day) {
    return null;
  }

  // 현재 장소
  const originSpot = day.spots[spotIndex];

  // 다음 장소
  const destinationSpot = day.spots[spotIndex + 1];

  // 마지막 장소라면 이동 경로가 없음
  if (!originSpot || !destinationSpot) {
    return null;
  }

  // 현재 이동 구간
  const fromId = originSpot.contentId;
  const toId = destinationSpot.contentId;

  // =========================================================
  // 자동차
  // =========================================================
  if (course.transportMode === "CAR") {
    const dayRoute = course.carRoutes?.find((route) => route.day === day.day);

    if (!dayRoute) {
      return null;
    }

    // 현재 장소 → 다음 장소에 해당하는 leg 하나만 찾음
    const leg = dayRoute.legs.find(
      (leg) => leg.fromId === fromId && leg.toId === toId,
    );

    if (!leg || !leg.success || leg.path.length === 0) {
      return null;
    }

    return {
      type: "CAR",

      origin: {
        x: originSpot.mapX,
        y: originSpot.mapY,
        index: spotIndex,
      },

      destination: {
        x: destinationSpot.mapX,
        y: destinationSpot.mapY,
        index: spotIndex + 1,
      },

      bound: calculateBounds(leg.path),

      paths: leg.path,
    };
  }

  // =========================================================
  // 대중교통
  // =========================================================
  const dayRoute = course.transitRoutes?.find((route) => route.day === day.day);

  if (!dayRoute) {
    return null;
  }

  // 현재 장소 → 다음 장소에 해당하는 detail 하나만 찾음
  const detail = dayRoute.details.find(
    (detail) => detail.fromId === fromId && detail.toId === toId,
  );

  if (!detail || !detail.success) {
    return null;
  }

  // 하나의 이동 구간 안에서도
  // WALKING → BUS → WALKING처럼 여러 step이 있을 수 있음
  const routes = detail.steps
    .filter((step) => step.type === "WALKING" || step.type === "BUS")
    .map((step) => ({
      type: step.type as "WALKING" | "BUS",
      path: step.path,
    }));

  const allPaths = routes.flatMap((route) => route.path);

  if (allPaths.length === 0) {
    return null;
  }

  return {
    type: "TRANSIT",

    origin: {
      x: originSpot.mapX,
      y: originSpot.mapY,
      index: spotIndex,
    },

    destination: {
      x: destinationSpot.mapX,
      y: destinationSpot.mapY,
      index: spotIndex + 1,
    },

    bound: calculateBounds(allPaths),

    routes,
  };
}
