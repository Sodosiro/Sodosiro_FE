export const FEED: FeedType[] = [
  {
    feedId: 1,
    author: {
      userId: 1,
      displayName: "강원도 거북이",
      profileImageUrl: null,
    },
    spot: {
      contentId: 1,
      title: "민둥산",
    },
    images: [
      {
        imageUrl:
          "https://i.pinimg.com/736x/f3/61/8c/f3618ca2cb591e24fee1f10e3d431e0e.jpg",
        displayOrder: 1,
      },
      {
        imageUrl:
          "https://i.pinimg.com/736x/67/7e/e5/677ee50d87fee5ff73a7a76b9d5bdd37.jpg",
        displayOrder: 2,
      },
      {
        imageUrl:
          "https://i.pinimg.com/736x/86/58/fc/8658fcef798cbd104632865a04e225f1.jpg",
        displayOrder: 3,
      },
      {
        imageUrl:
          "https://i.pinimg.com/736x/48/3c/ef/483cef991640f18fe41db5bfd075bd1c.jpg",
        displayOrder: 4,
      },
      {
        imageUrl:
          "https://i.pinimg.com/736x/7f/54/4d/7f544dc6fa3ccc98a0f64ccfabcabfb4.jpg",
        displayOrder: 5,
      },
    ],
    body: "강아지랑 잔디밭에서 뛰어놀았어요",
    likeCount: 328,
    bookmarkCount: 212,
    createdAt: new Date("2026-08-16T04:48:28.120Z"),
  },
  {
    feedId: 2,
    author: {
      userId: 1,
      displayName: "강원도 거북이",
      profileImageUrl: null,
    },
    spot: {
      contentId: 2,
      title: "민둥산",
    },
    images: [
      {
        imageUrl:
          "https://i.pinimg.com/736x/87/cb/4b/87cb4b9cf5143f227c150643bc2bb12f.jpg",
        displayOrder: 1,
      },
      {
        imageUrl:
          "https://i.pinimg.com/736x/07/18/59/071859f53cefcdf1e0532870987f9037.jpg",
        displayOrder: 2,
      },
      {
        imageUrl:
          "https://i.pinimg.com/1200x/89/a7/10/89a710c52519618414e086bc0d5c781a.jpg",
        displayOrder: 3,
      },
    ],
    body: "강아지랑 잔디밭에서 뛰어놀았어요",
    likeCount: 328,
    bookmarkCount: 212,
    createdAt: new Date("2026-08-16T04:48:28.120Z"),
  },
];

export const TRIP_HISTORY: TripHistoryType[] = [
  {
    historyId: 1,
    title: "양구 당일치기",
    startDate: new Date("2026-10-4"),
    endDate: new Date("2026-10-4"),
  },
  {
    historyId: 2,
    title: "정선 가족 여행",
    startDate: new Date("2026-10-5"),
    endDate: new Date("2026-10-9"),
  },
];

export const TRIP_HISTORY_PLACES: TripHistoryPlaceType[] = [
  {
    contentId: 1,
    title: "거진항 백섬해상전망대",
    category: 4,
    firstImage: null,
  },
  {
    contentId: 2,
    title: "논골담길",
    category: 4,
    firstImage: null,
  },
  {
    contentId: 3,
    title: "보사노바 커피로스터스 강릉점",
    category: 2,
    firstImage: null,
  },
];
