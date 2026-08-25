type UpcomingTripCardType = {
  id: string;
  dDay: number;
  title: string;
  region: string;
  startDate: string;
  nights: number;
  locationText: string;
};

export const UPCOMING_TRIPS: UpcomingTripCardType[] = [
  {
    id: "trip-001",
    dDay: 3,
    title: "원이랑 강원도 여행",
    region: "영월",
    startDate: "10/14 (수)",
    nights: 1,
    locationText: "청령포 외 4곳",
  },
  {
    id: "trip-002",
    dDay: 15,
    title: "가족과 제주도 여행",
    region: "제주",
    startDate: "10/26 (월)",
    nights: 3,
    locationText: "성산일출봉 외 6곳",
  },
  {
    id: "trip-003",
    dDay: 42,
    title: "친구들과 부산 여행",
    region: "부산",
    startDate: "11/22 (일)",
    nights: 2,
    locationText: "해운대 외 5곳",
  },
];

type RouteStep = {
  id: string;
  type: "bus" | "walk";
  label: string; // "버스 504-1", "도보"
  duration: string; // "5분" (표시용)
  durationMinutes: number; // 5 (비율 계산용)
  distance: string; // "300m"
};

type BusRouteSummaryCardProps = {
  totalDuration: string;
  totalDistance: string;
  fare: string;
  steps: RouteStep[];
};

export const MOCK_TRANSPORT_ROUTE: BusRouteSummaryCardProps = {
  totalDuration: "14분",
  totalDistance: "1.3km",
  fare: "1,750원",
  steps: [
    {
      id: "step-1",
      type: "bus",
      label: "버스 504-1",
      duration: "5분",
      durationMinutes: 5,
      distance: "300m",
    },
    {
      id: "step-2",
      type: "walk",
      label: "도보",
      duration: "3분",
      durationMinutes: 3,
      distance: "200m",
    },
    {
      id: "step-3",
      type: "bus",
      label: "버스 504",
      duration: "6분",
      durationMinutes: 6,
      distance: "800m",
    },
  ],
};
