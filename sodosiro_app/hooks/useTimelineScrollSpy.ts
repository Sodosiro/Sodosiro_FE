import { useCallback, useRef, useState } from "react";
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from "react-native";

const SCROLL_SPY_OFFSET = 80;
const PROGRAMMATIC_SCROLL_LOCK_MS = 400;

// 메인 리스트 스크롤과 상단 일차 뱃지 바를 서로 동기화하는 훅
// - 뱃지를 누르면 리스트가 해당 위치로 스크롤됨
// - 리스트를 스크롤하면 현재 보이는 섹션에 맞는 뱃지가 자동으로 활성화/스크롤됨
export function useTimelineScrollSpy() {
  const [activeIndex, setActiveIndex] = useState(0);

  const mainScrollRef = useRef<ScrollView>(null);
  const badgeScrollRef = useRef<ScrollView>(null);

  const sectionOffsets = useRef<Record<number, number>>({});
  const badgeLayouts = useRef<Record<number, { x: number; width: number }>>({});

  const isProgrammaticScroll = useRef(false);
  const programmaticScrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollBadgeIntoView = useCallback((index: number) => {
    const layout = badgeLayouts.current[index];
    if (!layout) return;
    const targetX = Math.max(layout.x - 20, 0);
    badgeScrollRef.current?.scrollTo({ x: targetX, animated: true });
  }, []);

  const handlePressDayBadge = useCallback(
    (index: number) => {
      const offsetY = sectionOffsets.current[index];
      if (offsetY === undefined) return;

      isProgrammaticScroll.current = true;
      if (programmaticScrollTimer.current) clearTimeout(programmaticScrollTimer.current);

      setActiveIndex(index);
      scrollBadgeIntoView(index);
      mainScrollRef.current?.scrollTo({ y: Math.max(offsetY - 12, 0), animated: true });

      programmaticScrollTimer.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, PROGRAMMATIC_SCROLL_LOCK_MS);
    },
    [scrollBadgeIntoView],
  );

  const handleMainScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (isProgrammaticScroll.current) return;

      const y = e.nativeEvent.contentOffset.y;
      const entries = Object.entries(sectionOffsets.current) as unknown as [string, number][];
      if (entries.length === 0) return;

      let current = entries[0][0];
      let currentOffset = -Infinity;
      for (const [indexKey, offsetY] of entries) {
        if (offsetY - SCROLL_SPY_OFFSET <= y && offsetY > currentOffset) {
          current = indexKey;
          currentOffset = offsetY;
        }
      }

      const currentIndex = Number(current);
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

  const handleSectionLayout = useCallback((index: number, e: LayoutChangeEvent) => {
    sectionOffsets.current[index] = e.nativeEvent.layout.y;
  }, []);

  const handleBadgeLayout = useCallback((index: number, e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    badgeLayouts.current[index] = { x, width };
  }, []);

  return {
    activeIndex,
    setActiveIndex,
    mainScrollRef,
    badgeScrollRef,
    handlePressDayBadge,
    handleMainScroll,
    handleSectionLayout,
    handleBadgeLayout,
  };
}
