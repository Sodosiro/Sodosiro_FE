type DayPlan = {
  id: number;
  dateLabel: string;
  places: PlaceType[];
};

type TripStatus = "UPCOMING" | "IN_PROGRESS" | "FINISHED";
