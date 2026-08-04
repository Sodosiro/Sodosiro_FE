import { useCallback, useRef, useState } from "react";
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from "react-native";

const PROGRAMMATIC_SCROLL_LOCK_MS = 700;

type SectionPosition = {
  start: number;
  end: number;
};

export function useTimelineScrollSpy() {
  const [activeIndex, setActiveIndex] = useState(0);

  const mainScrollRef = useRef<ScrollView>(null);
  const badgeScrollRef = useRef<ScrollView>(null);

  const sectionPositions = useRef<Record<number, SectionPosition>>({});
  const badgeLayouts = useRef<Record<number, { x: number; width: number }>>({});

  const isScrolling = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollBadgeIntoView = useCallback((index: number) => {
    const layout = badgeLayouts.current[index];

    if (!layout) return;

    badgeScrollRef.current?.scrollTo({
      x: Math.max(layout.x - 20, 0),
      animated: true,
    });
  }, []);

  const moveToSection = useCallback(
    (index: number) => {
      const section = sectionPositions.current[index];

      if (!section) return;

      setActiveIndex(index);
      scrollBadgeIntoView(index);

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
    [scrollBadgeIntoView],
  );

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (isScrolling.current) return;

      const scrollY = event.nativeEvent.contentOffset.y;
      const screenBottom = scrollY + event.nativeEvent.layoutMeasurement.height;

      const entries = Object.entries(sectionPositions.current) as [
        string,
        SectionPosition,
      ][];

      if (entries.length === 0) return;

      let currentIndex = 0;

      // 최상단
      if (scrollY <= 0) {
        currentIndex = 0;
      }
      // 아래쪽부터 판단
      else {
        for (let i = entries.length - 1; i >= 0; i--) {
          const [index, position] = entries[i];

          if (screenBottom >= position.start) {
            currentIndex = Number(index);
            break;
          }
        }
      }

      setActiveIndex((prev) => {
        if (prev !== currentIndex) {
          scrollBadgeIntoView(currentIndex);
          return currentIndex;
        }

        return prev;
      });
    },
    [scrollBadgeIntoView],
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

  return {
    activeIndex,
    setActiveIndex,

    mainScrollRef,
    badgeScrollRef,

    moveToSection,

    handleScroll,
    handleSectionLayout,
    handleBadgeLayout,
  };
}
