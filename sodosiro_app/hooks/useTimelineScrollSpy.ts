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

  // 프로그래밍 방식(뱃지 클릭)으로 스크롤 중인지 여부
  const isProgrammaticScroll = useRef(false);
  // 사용자가 직접 손가락으로 드래그 중인지 여부
  const isUserDragging = useRef(false);

  const handleBadgeContainerLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    if (width > 0) {
      badgeContainerWidth.current = width;
    }
  }, []);

  // 뱃지를 화면 중앙으로 스크롤하는 함수 (본문 스크롤에는 절대 관여 안 함)
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

  // activeIndex 변경 시 뱃지 포커싱 실행 (세로 스크롤/클릭 모두 뱃지만 움직임)
  useEffect(() => {
    scrollBadgeIntoView(activeIndex);
  }, [activeIndex, scrollBadgeIntoView]);

  // 뱃지를 눌러서 세로 스크롤을 이동시킬 때만 호출되는 함수
  const moveToSection = useCallback((index: number) => {
    const section = sectionPositions.current[index];
    if (!section) return;

    // 프로그래밍 이동 시작 설정
    isProgrammaticScroll.current = true;
    setActiveIndex(index);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    mainScrollRef.current?.scrollTo({
      y: Math.max(section.start - 12, 0),
      animated: true,
    });

    // 이동 완료 후 잠금 해제
    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
      scrollTimeoutRef.current = null;
    }, PROGRAMMATIC_SCROLL_LOCK_MS);
  }, []);

  // 세로 스크롤 감지 핸들러
  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    // 뱃지 클릭으로 스크롤 중일 때는 세로 스크롤 감지에 의한 activeIndex 변경을 무시 (충돌 방지)
    if (isProgrammaticScroll.current) return;

    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const scrollY = contentOffset.y;

    const entries = Object.entries(sectionPositions.current) as [string, SectionPosition][];

    if (entries.length === 0) return;

    let currentIndex = 0;

    // 최상단
    if (scrollY <= 10) {
      currentIndex = 0;
    }
    // 최하단
    else if (
      contentSize.height > 0 &&
      layoutMeasurement.height + scrollY >= contentSize.height - 20
    ) {
      currentIndex = entries.length - 1;
    }
    // 일반 스크롤 영역
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

    // 인덱스가 실제로 바뀔 때만 업데이트 (불필요한 re-render 방지)
    setActiveIndex((prev) => (prev !== currentIndex ? currentIndex : prev));
  }, []);

  const handleSectionLayout = useCallback((index: number, event: LayoutChangeEvent) => {
    const { y, height } = event.nativeEvent.layout;

    sectionPositions.current[index] = {
      start: y,
      end: y + height,
    };
  }, []);

  const handleBadgeLayout = useCallback((index: number, event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;

    badgeLayouts.current[index] = {
      x,
      width,
    };
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
