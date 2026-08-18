type SodosiType = {
  name: string;
  comment: string;
  sigunguId: number;
  areaCode: string;
  sigunguCode: string;
};

type RegionType = {
  title: string;
  desc: string;
  keywords: string[];
  images: string[];
  reasons: string[];
  topAttractions: {
    id: number;
    title: string;
    desc: string;
    imageUrl: string;
  }[];
  recommendMonth: {
    startMonth: number;
    endMonth: number;
    reason: string;
  };
  topFoods: string[];
};
