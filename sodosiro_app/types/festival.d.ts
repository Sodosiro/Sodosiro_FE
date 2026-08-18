type FestivalType = {
  festivalId: number;
  title: string;
  regionName: string;
  startDate: Date;
  endDate: Date;
  imageUrl: string;
  linkUrl: string;
  status: FestivalStatus;
  description: string;
  tags: string[];
};

type FestivalStatus = "ALL" | "ACTIVE" | "ONGOING" | "UPCOMING" | "ENDED";
