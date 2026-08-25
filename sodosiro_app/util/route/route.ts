import { CarRouteLeg, CourseDetailResponse, SpotItem, TransitRouteDetail } from "@/api/course";

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
    min_x,
    min_y,
    max_x,
    max_y,
  };
}

export type RoutePoint = {
  longitude: number;
  latitude: number;
};

export type TransitStepType = "WALKING" | "BUS";

export function createRouteInfo(
  course: CourseDetailResponse,
  dayIndex: number,
  spotIndex: number,
): RouteInfo | null {
  const day = course.days?.[dayIndex];

  if (!day) return null;

  const originSpot = day.spots[spotIndex];
  const destinationSpot = day.spots[spotIndex + 1];

  if (!originSpot || !destinationSpot) return null;

  const fromId = originSpot.contentId;
  const toId = destinationSpot.contentId;

  // =========================================================
  // 자동차
  // =========================================================
  if (course.transportMode === "CAR") {
    const dayRoute = course.carRoutes?.find((route) => route.day === day.day);
    if (!dayRoute) return null;

    const leg = dayRoute.legs.find((leg) => leg.fromId === fromId && leg.toId === toId);
    if (!leg || !leg.success || leg.path.length === 0) return null;

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
  if (!dayRoute) return null;

  const detail = dayRoute.details.find(
    (detail) => detail.fromId === fromId && detail.toId === toId,
  );

  if (!detail || !detail.success) return null;

  const routes = detail.steps
    .filter((step) => step.type === "WALKING" || step.type === "BUS")
    .map((step) => ({
      type: step.type as "WALKING" | "BUS",
      path: step.path,
    }));

  const allPaths = routes.flatMap((route) => route.path);

  if (allPaths.length === 0) return null;

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

// 스팟 사이에 배치될 경로 정보를 가진 통합 스팟 아이템 타입
export type RenderSpotItem = SpotItem & {
  nextCarRouteLeg?: CarRouteLeg | null;
  nextTransitRouteDetail?: TransitRouteDetail | null;
};

// 화면 렌더링 전용 통합 Day 타입
export type RenderCourseDayItem = {
  day: number;
  date: string;
  spots: RenderSpotItem[];
};

type TransitStepItem = {
  type: string;
  typeText?: string;
  instruction?: string;
  sectionTimeSeconds?: number;
  durationSeconds?: number;
  distanceMeters?: number;
  path?: RoutePoint[];
  [key: string]: any; // API에서 내려오는 기타 필드 허용
};

/**
 * 연속된 WALKING 구간을 하나로 합치고 시간/거리를 계산해 주는 헬퍼 함수
 */
function mergeConsecutiveWalkingSteps(steps: TransitStepItem[]): TransitStepItem[] {
  if (!steps || steps.length === 0) return [];

  return steps.reduce<TransitStepItem[]>((acc, currentStep) => {
    const prevStep = acc[acc.length - 1];

    // 이전 구간과 현재 구간이 모두 WALKING인 경우 합산
    if (prevStep && prevStep.type === "WALKING" && currentStep.type === "WALKING") {
      const mergedDuration =
        (prevStep.sectionTimeSeconds ?? prevStep.durationSeconds ?? 0) +
        (currentStep.sectionTimeSeconds ?? currentStep.durationSeconds ?? 0);

      const mergedDistance = (prevStep.distanceMeters ?? 0) + (currentStep.distanceMeters ?? 0);

      // 좌표 path도 이어 붙임
      const mergedPath = [...(prevStep.path ?? []), ...(currentStep.path ?? [])];

      acc[acc.length - 1] = {
        ...prevStep,
        typeText: "도보",
        instruction: "도보",
        sectionTimeSeconds: mergedDuration,
        durationSeconds: mergedDuration,
        distanceMeters: mergedDistance,
        path: mergedPath,
      };
    } else {
      // 도보일 경우 텍스트를 "도보"로 정돈하여 push
      if (currentStep.type === "WALKING") {
        acc.push({
          ...currentStep,
          typeText: "도보",
          instruction: "도보",
        });
      } else {
        acc.push(currentStep);
      }
    }

    return acc;
  }, []);
}

export function transformCourseDetail(data: CourseDetailResponse): RenderCourseDayItem[] {
  const { transportMode, days, carRoutes, transitRoutes } = data;

  return days.map((dayItem) => {
    const currentCarRoute = carRoutes?.find((cr) => cr.day === dayItem.day);
    const currentTransitRoute = transitRoutes?.find((tr) => tr.day === dayItem.day);

    const spotsWithRoutes: RenderSpotItem[] = dayItem.spots.map((spot, index) => {
      const nextSpot = dayItem.spots[index + 1];

      if (!nextSpot) {
        return { ...spot, nextCarRouteLeg: null, nextTransitRouteDetail: null };
      }

      // 자차인 경우
      const carLeg =
        transportMode === "CAR"
          ? (currentCarRoute?.legs.find(
              (leg) => leg.fromId === spot.contentId && leg.toId === nextSpot.contentId,
            ) ?? null)
          : null;

      // 대중교통인 경우
      let transitDetail: TransitRouteDetail | null = null;

      if (transportMode === "PUBLIC_TRANSPORT" && currentTransitRoute) {
        const rawDetail = currentTransitRoute.details.find(
          (detail) => detail.fromId === spot.contentId && detail.toId === nextSpot.contentId,
        );

        if (rawDetail) {
          // 연속된 도보(WALKING) 구간들을 합산 처리
          transitDetail = {
            ...rawDetail,
            steps: mergeConsecutiveWalkingSteps(
              rawDetail.steps as unknown as TransitStepItem[],
            ) as any,
          };
        }
      }

      return {
        ...spot,
        nextCarRouteLeg: carLeg,
        nextTransitRouteDetail: transitDetail,
      };
    });

    return {
      day: dayItem.day,
      date: dayItem.date,
      spots: spotsWithRoutes,
    };
  });
}
