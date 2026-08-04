import { useCallback, useEffect, useRef, useState } from "react";
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView as RNScrollView,
} from "react-native";
import { ScrollView as GHScrollView } from "react-native-gesture-handler";

const PROGRAMMATIC_SCROLL_LOCK_MS = 700;

type SectionPosition = {
  start: number;
  end: number;
};

export function useTimelineScrollSpy() {
  const [activeIndex, setActiveIndex] = useState(0);

  const mainScrollRef = useRef<RNScrollView>(null);
  const badgeScrollRef = useRef<GHScrollView>(null);

  const sectionPositions = useRef<Record<number, SectionPosition>>({});
  const badgeLayouts = useRef<Record<number, { x: number; width: number }>>({});
  const badgeContainerWidth = useRef<number>(0);

  const sectionLayoutHandlers = useRef<Record<number, (e: LayoutChangeEvent) => void>>({});
  const badgeLayoutHandlers = useRef<Record<number, (e: LayoutChangeEvent) => void>>({});

  const isScrolling = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleBadgeContainerLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    if (width > 0) {
      badgeContainerWidth.current = width;
    }
  }, []);

  const scrollBadgeIntoView = useCallback((index: number) => {
    const layout = badgeLayouts.current[index];

    if (!layout) return;

    const containerWidth = badgeContainerWidth.current || 300;
    const targetX = layout.x + layout.width / 2 - containerWidth / 2;

    badgeScrollRef.current?.scrollTo({
      x: Math.max(targetX, 0),
      animated: true,
    });
  }, []);

  // activeIndex 변경 시 뱃지 포커싱 스크롤 수행
  useEffect(() => {
    scrollBadgeIntoView(activeIndex);
  }, [activeIndex, scrollBadgeIntoView]);

  const moveToSection = useCallback(
    (index: number) => {
      const section = sectionPositions.current[index];

      if (!section) return;

      setActiveIndex(index);

      isScrolling.current = true;

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      mainScrollRef.current?.scrollTo({
        y: Math.max(section.start - 12, 0),
        animated: true,
      });

      scrollTimeoutRef.current = setTimeout(() => {
        isScrolling.current = false;
        scrollTimeoutRef.current = null;
      }, PROGRAMMATIC_SCROLL_LOCK_MS);
    },
    [],
  );

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (isScrolling.current) return;

      const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
      const scrollY = contentOffset.y;

      const entries = Object.entries(sectionPositions.current) as [
        string,
        SectionPosition,
      ][];

      if (entries.length === 0) return;

      let currentIndex = 0;

      // 최상단
      if (scrollY <= 10) {
        currentIndex = 0;
      }
      // 맨 하단
      else if (
        contentSize.height > 0 &&
        layoutMeasurement.height + scrollY >= contentSize.height - 20
      ) {
        currentIndex = entries.length - 1;
      }
      // 스크롤 상단 위치 기준 (상단 여백 80px 고려)
      else {
        const topThreshold = scrollY + 80;
        for (let i = 0; i < entries.length; i++) {
          const [indexStr, position] = entries[i];
          const index = Number(indexStr);

          if (topThreshold >= position.start) {
            currentIndex = index;
          } else {
            break;
          }
        }
      }

      setActiveIndex((prev) => (prev !== currentIndex ? currentIndex : prev));
    },
    [],
  );

  const handleSectionLayout = useCallback(
    (index: number, event: LayoutChangeEvent) => {
      const { y, height } = event.nativeEvent.layout;

      sectionPositions.current[index] = {
        start: y,
        end: y + height,
      };
    },
    [],
  );

  const handleBadgeLayout = useCallback(
    (index: number, event: LayoutChangeEvent) => {
      const { x, width } = event.nativeEvent.layout;

      badgeLayouts.current[index] = {
        x,
        width,
      };
    },
    [],
  );

  const getSectionLayoutHandler = useCallback(
    (index: number) => {
      if (!sectionLayoutHandlers.current[index]) {
        sectionLayoutHandlers.current[index] = (event: LayoutChangeEvent) => {
          handleSectionLayout(index, event);
        };
      }
      return sectionLayoutHandlers.current[index];
    },
    [handleSectionLayout],
  );

  const getBadgeLayoutHandler = useCallback(
    (index: number) => {
      if (!badgeLayoutHandlers.current[index]) {
        badgeLayoutHandlers.current[index] = (event: LayoutChangeEvent) => {
          handleBadgeLayout(index, event);
        };
      }
      return badgeLayoutHandlers.current[index];
    },
    [handleBadgeLayout],
  );

  return {
    activeIndex,
    setActiveIndex,

    mainScrollRef,
    badgeScrollRef,

    moveToSection,

    handleScroll,
    handleSectionLayout,
    handleBadgeLayout,
    handleBadgeContainerLayout,
    getSectionLayoutHandler,
    getBadgeLayoutHandler,
  };
}

