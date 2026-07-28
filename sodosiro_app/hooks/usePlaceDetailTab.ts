import { useRef, useState } from "react";
import type {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from "react-native";

type TabType = "이용 정보" | "리뷰" | "함께 추천";

type SectionPosition = {
  start: number;
  end: number;
};

export function usePlaceDetailTab() {
  const scrollRef = useRef<ScrollView>(null);
  const infoRef = useRef<View>(null);
  const reviewRef = useRef<View>(null);
  const recommendRef = useRef<View>(null);
  const isScrolling = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionPositions = useRef<Record<TabType, SectionPosition>>({
    "이용 정보": { start: 0, end: 0 },
    리뷰: { start: 0, end: 0 },
    "함께 추천": { start: 0, end: 0 },
  });
  const [currentTab, setCurrentTab] = useState<TabType>("이용 정보");

  const moveToSection = (tab: TabType) => {
    const ref =
      tab === "이용 정보" ? infoRef : tab === "리뷰" ? reviewRef : recommendRef;

    setCurrentTab(tab);

    isScrolling.current = true;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    ref.current?.measureLayout(scrollRef.current as any, (_, y) => {
      scrollRef.current?.scrollTo({
        y: y - 40,
        animated: true,
      });

      scrollTimeoutRef.current = setTimeout(() => {
        isScrolling.current = false;
        scrollTimeoutRef.current = null;
      }, 500);
    });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isScrolling.current) return;

    const scrollY = event.nativeEvent.contentOffset.y;
    const screenBottom = scrollY + event.nativeEvent.layoutMeasurement.height;

    const positions = sectionPositions.current;

    if (screenBottom + 1 >= positions["함께 추천"].end) {
      setCurrentTab("함께 추천");
    } else if (screenBottom >= positions["리뷰"].end) {
      setCurrentTab("리뷰");
    } else {
      setCurrentTab("이용 정보");
    }
  };

  const handleOnLayout = (event: LayoutChangeEvent, tab: TabType) => {
    const { y, height } = event.nativeEvent.layout;

    sectionPositions.current[tab] = {
      start: y,
      end: y + height,
    };
  };

  return {
    scrollRef,
    infoRef,
    reviewRef,
    recommendRef,
    currentTab,
    moveToSection,
    handleScroll,
    handleOnLayout,
  };
}
