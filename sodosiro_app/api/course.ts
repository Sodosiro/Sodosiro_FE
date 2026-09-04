import { axiosInstance } from "./instance";

// AI 추천 코스 요청 데이터 타입 정의
export type CourseRecommendationRequest = {
  title: string;
  sigunguCode: number | string;
  startDate: string;
  transportMode: string;
  endDate: string;
  travelStyles: string[];
  mustVisitContentId?: number;
  aiMessage?: string;
};

// 여행 상태 타입 (BE 스펙에 맞춰 추가/수정)
export type CourseStatus = "UPCOMING" | "FINISHED" | "IN_PROGRESS";

// GET /api/v1/courses/me 요청 파라미터 타입
export type GetMyCoursesParams = {
  status?: CourseStatus;
};

// 코스 목록의 개별 항목 타입
export type CourseSummaryItem = {
  courseId: number;
  title: string;
  displayName: string;
  thumbnail?: string;
  startDate: string;
  endDate: string;
  isConfirmed: boolean; // 확정 여부 (draft 구분을 위함)
  status: CourseStatus;
  sigunguCode: string;
  createdAt: Date;
};

// API 응답 구조 타입
export type MyCoursesResponse = {
  courses: CourseSummaryItem[];
};

// 이동 수단 타입
export type TransportMode = "CAR" | "PUBLIC_TRANSPORT";

// 좌표 타입
export type GeoPoint = {
  longitude: number;
  latitude: number;
};

// 스팟(장소) 상세 정보 타입
export type SpotItem = {
  contentId: number;
  title: string;
  overview: string;
  firstImage?: string;
  mapX: number;
  mapY: number;
  category: CategoryNumber;
  mustVisit: boolean;
  gpsVerified: boolean;
  reviewWritten: boolean;
  reviewId: number | null;
  avgRating: number; // 추가됨
  reviewCount: number; // 추가됨
  region: string; // 추가됨
  popularity?: {
    rankTag: string; // 추가됨
  };
};

// 일자별 일정 타입
export type CourseDayItem = {
  day: number;
  date: string;
  spots: SpotItem[];
};

// --- 자차 경로 (carRoutes) 관련 타입 ---
export type CarRouteLeg = {
  fromId: number;
  toId: number;
  durationSeconds: number;
  distanceMeters: number;
  tollFare: number;
  estimatedFuelCost: number;
  path: GeoPoint[];
  success: boolean;
};

export type CourseCarRoute = {
  day: number;
  legs: CarRouteLeg[];
};

// --- 대중교통 경로 (transitRoutes) 관련 타입 ---
export type TransitRouteStep = {
  type: string;
  guidance: string;
  distanceMeters: number;
  timeSeconds: number;
  stopNames: string[];
  vehicleNames: string[];
  path: GeoPoint[];
};

export type TransitRouteDetail = {
  fromId: number;
  toId: number;
  success: boolean;
  type: string;
  totalTimeSeconds: number;
  totalDistanceMeters: number;
  transfers: number;
  fare: number;
  steps: TransitRouteStep[];
};

export type CourseTransitRoute = {
  day: number;
  details: TransitRouteDetail[];
};

// --- 코스 상세 조회 API 응답 타입 (GET /api/v1/courses/{courseId}) ---
export type CourseDetailResponse = {
  courseId: number;
  title: string;
  startDate: string;
  endDate: string;
  status: CourseStatus;
  transportMode: TransportMode;
  days: CourseDayItem[];
  carRoutes: CourseCarRoute[] | null; // 타입 세부화
  transitRoutes: CourseTransitRoute[] | null; // 타입 세부화
};

// --- 일차별 장소 순서/구성 수정 (PATCH /api/v1/courses/{courseId}/days) ---
export type CourseDayUpdateItem = {
  day: number;
  contentIds: number[];
};

export type UpdateCourseDaysRequest = {
  days: CourseDayUpdateItem[];
};

export async function getCoursesApi(status?: TripStatus) {
  return axiosInstance.get("/api/v1/courses/me", { params: { status } });
}

export async function postCourseRecommendationsApi(
  body: CourseRecommendationRequest,
) {
  return await axiosInstance.post("/api/v1/courses/recommendations", body);
}

/**
 * 내 코스 목록 조회 (최신순 / ID 역순)
 * status로 여행 상태 필터링 가능 (생략 시 전체 반환, UPCOMING 시 draft 포함)
 */
export async function getMyCoursesApi(params?: GetMyCoursesParams) {
  return axiosInstance.get<MyCoursesResponse>("/api/v1/courses/me", { params });
}

/**
 * 코스 삭제 API
 * DELETE /api/v1/courses/{courseId}
 */
export const deleteCourse = async (courseId: number): Promise<void> => {
  await axiosInstance.delete(`/api/v1/courses/${courseId}`);
};

/** 코스 상세 조회 API */
export const getCourseDetail = async (courseId: string | number) => {
  return await axiosInstance.get(`/api/v1/courses/${courseId}`);
};

/**
 * 코스의 일차별 스팟 순서/장소 수정 API
 * PATCH /api/v1/courses/{courseId}/days
 */
export async function updateCourseDaysApi(
  courseId: string | number,
  requestData: UpdateCourseDaysRequest,
) {
  return await axiosInstance.patch(
    `/api/v1/courses/${courseId}/days`,
    requestData,
  );
}

/**
 * 코스 확정 API
 * POST /api/v1/courses/confirm
 */
export async function confirmCourseApi(params: { courseId: number }) {
  return await axiosInstance.post("/api/v1/courses/confirm", params);
}

export async function postCourseGps(
  courseId: number,
  contentId: number,
  day: number,
) {
  return await axiosInstance.post(`/api/v1/gps`, {
    courseId,
    contentId,
    day,
  });
}

export async function getAiQuota() {
  return await axiosInstance.get(`/api/v1/courses/recommendations/quota`);
}
