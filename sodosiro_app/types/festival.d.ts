type FestivalType = {
  festivalId: number;
  title: string;
  regionName: string;
  startDate: Date;
  endDate: Date;
  imageUrl: string;
  status: FestivalStatus;
  desc: string;
  keywords: string[];
};

type FestivalStatus = "ALL" | "ACTIVE" | "ONGOING" | "UPCOMING" | "ENDED";
