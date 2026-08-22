type DayPlan = {
  id: number;
  dateLabel: string;
  places: TimelinePlaceType[];
};

type TripStatus = "UPCOMING" | "IN_PROGRESS" | "FINISHED";
