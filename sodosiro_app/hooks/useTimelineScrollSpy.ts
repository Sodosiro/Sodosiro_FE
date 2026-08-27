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

// initialIndex 옵션 추가
export function useTimelineScrollSpy(initialIndex = 0) {
  // 초기 activeIndex 설정
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const mainScrollRef = useRef<RNScrollView>(null);
  const badgeScrollRef = useRef<GHScrollView>(null);

  const sectionPositions = useRef<Record<number, SectionPosition>>({});
  const badgeLayouts = useRef<Record<number, { x: number; width: number }>>({});
  const badgeContainerWidth = useRef<number>(0);

  const sectionLayoutHandlers = useRef<Record<number, (e: LayoutChangeEvent) => void>>({});
  const badgeLayoutHandlers = useRef<Record<number, (e: LayoutChangeEvent) => void>>({});

  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isProgrammaticScroll = useRef(false);

  // 초기 이동 수행 여부 플래그
  const hasInitiallyScrolled = useRef(false);

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

  useEffect(() => {
    scrollBadgeIntoView(activeIndex);
  }, [activeIndex, scrollBadgeIntoView]);

  const moveToSection = useCallback((index: number, animated = true) => {
    const section = sectionPositions.current[index];
    if (!section) return;

    isProgrammaticScroll.current = true;
    setActiveIndex(index);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    mainScrollRef.current?.scrollTo({
      y: Math.max(section.start - 12, 0),
      animated,
    });

    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
      scrollTimeoutRef.current = null;
    }, PROGRAMMATIC_SCROLL_LOCK_MS);
  }, []);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isProgrammaticScroll.current) return;

    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const scrollY = contentOffset.y;

    const entries = Object.entries(sectionPositions.current) as [string, SectionPosition][];
    if (entries.length === 0) return;

    let currentIndex = 0;

    if (scrollY <= 10) {
      currentIndex = 0;
    } else if (
      contentSize.height > 0 &&
      layoutMeasurement.height + scrollY >= contentSize.height - 20
    ) {
      currentIndex = entries.length - 1;
    } else {
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
  }, []);

  // 섹션 레이아웃 등록 시 초기 목표 인덱스가 수집되면 자동 이동
  const handleSectionLayout = useCallback(
    (index: number, event: LayoutChangeEvent) => {
      const { y, height } = event.nativeEvent.layout;

      sectionPositions.current[index] = {
        start: y,
        end: y + height,
      };

      // targetIndex에 해당하는 레이아웃 측정이 완료되었고, 아직 초기 스크롤을 진행하지 않은 경우
      if (index === initialIndex && !hasInitiallyScrolled.current) {
        hasInitiallyScrolled.current = true;
        // 레이아웃이 완전히 정돈된 후 스크롤되도록 microtask 처리
        setTimeout(() => {
          moveToSection(initialIndex, false); // 애니메이션 없이 바로 이동하려면 false
        }, 50);
      }
    },
    [initialIndex, moveToSection],
  );

  const handleBadgeLayout = useCallback((index: number, event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    badgeLayouts.current[index] = { x, width };
  }, []);

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
