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
};

// API 응답 구조 타입
export type MyCoursesResponse = {
  courses: CourseSummaryItem[];
};

export async function postCourseRecommendationsApi(body: CourseRecommendationRequest) {
  const { data } = await axiosInstance.post("/api/v1/courses/recommendations", body);
  return data;
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
