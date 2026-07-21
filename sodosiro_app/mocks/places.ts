export const HomePopularPlaces = [
  {
    id: 1,
    imageSource: require("../assets/mocks/popular_1.png"),
    title: "거진항 백섬해상전망대",
    desc: "여름에 가기 좋은 전망대",
  },
  {
    id: 2,
    imageSource: require("../assets/mocks/popular_2.png"),
    title: "논골담길",
    desc: "바다와 벽화가 어우러진 감성 골목길",
  },
  {
    id: 3,
    imageSource: require("../assets/mocks/popular_3.png"),
    title: "보사노바 커피로스터스 강릉점",
    desc: "바다 품은 오션뷰 카페",
  },
  {
    id: 4,
    imageSource: require("../assets/mocks/popular_4.png"),
    title: "초당순두부마을",
    desc: "순두부 먹자골목",
  },
  {
    id: 5,
    imageSource: require("../assets/mocks/popular_5.png"),
    title: "강릉 숲길공원",
    desc: "자연을 즐길 수 있는 산책로",
  },
];

export const Festivals = [
  {
    id: 1,
    imageSource: require("../assets/mocks/festival_1.png"),
    region: "강릉시",
    title: "강릉 커피 축제",
    startDate: new Date("2026-7-20"),
    endDate: new Date("2026-10-7"),
  },
  {
    id: 2,
    imageSource: require("../assets/mocks/festival_2.png"),
    region: "정선군",
    title: "정선 아리랑제",
    startDate: new Date("2026-10-7"),
    endDate: new Date("2026-10-9"),
  },
  {
    id: 3,
    imageSource: require("../assets/mocks/festival_3.png"),
    region: "춘천시",
    title: "닭갈비 축제",
    startDate: new Date("2026-10-9"),
    endDate: new Date("2026-10-13"),
  },
];

const categories: CategoryType[] = [
  "activity",
  "attraction",
  "cafe",
  "nature",
  "restaurant",
  "shopping",
];

const center = {
  lat: 37.5665,
  lng: 126.978,
};

export const Places: PlaceType[] = Array.from({ length: 500 }, (_, index) => ({
  id: index + 1,
  lat: center.lat + (Math.random() - 0.5) * 0.06,
  lng: center.lng + (Math.random() - 0.5) * 0.06,
  category: categories[Math.floor(Math.random() * categories.length)],
  favorite: Math.random() < 0.2,
  popular: Math.random() < 0.4,
}));

export const PlaceList: PlaceType[] = [
  {
    id: 1,
    title: "강릉길감자",
    imageSource: require("../assets/mocks/place_1.png"),
    category: "restaurant",
    desc: "쫀득하고 바삭한 이색 간식",
    rate: 4.8,
    review: 214,
  },
  {
    id: 2,
    title: "동화가든",
    imageSource: require("../assets/mocks/place_2.png"),
    category: "restaurant",
    desc: "포슬포슬 맛있는 우리집 감자",
    rate: 4.8,
    review: 214,
  },
  {
    id: 3,
    title: "감자좋아",
    imageSource: require("../assets/mocks/place_1.png"),
    category: "restaurant",
    desc: "포슬포슬 맛있는 우리집 감자",
    rate: 4.8,
    review: 214,
  },
  {
    id: 4,
    title: "강릉길감자",
    imageSource: require("../assets/mocks/place_1.png"),
    category: "restaurant",
    desc: "쫀득하고 바삭한 이색 간식",
    rate: 4.8,
    review: 214,
  },
  {
    id: 5,
    title: "동화가든",
    imageSource: require("../assets/mocks/place_2.png"),
    category: "restaurant",
    desc: "포슬포슬 맛있는 우리집 감자",
    rate: 4.8,
    review: 214,
  },
  {
    id: 6,
    title: "감자좋아",
    imageSource: require("../assets/mocks/place_1.png"),
    category: "restaurant",
    desc: "포슬포슬 맛있는 우리집 감자",
    rate: 4.8,
    review: 214,
  },
  {
    id: 7,
    title: "강릉길감자",
    imageSource: require("../assets/mocks/place_1.png"),
    category: "restaurant",
    desc: "쫀득하고 바삭한 이색 간식",
    rate: 4.8,
    review: 214,
  },
  {
    id: 8,
    title: "동화가든",
    imageSource: require("../assets/mocks/place_2.png"),
    category: "restaurant",
    desc: "포슬포슬 맛있는 우리집 감자",
    rate: 4.8,
    review: 214,
  },
  {
    id: 9,
    title: "감자좋아",
    imageSource: require("../assets/mocks/place_1.png"),
    category: "restaurant",
    desc: "포슬포슬 맛있는 우리집 감자",
    rate: 4.8,
    review: 214,
  },
];
