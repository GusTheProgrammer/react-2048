import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export type SwipeInput = { deltaX: number; deltaY: number };

type MobileSwiperProps = PropsWithChildren<{
  onSwipe: (_: SwipeInput) => void;
}>;

export default function MobileSwiper({ children, onSwipe }: MobileSwiperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const swipeThreshold = 12;
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const isInteractiveTarget = (target: EventTarget | null) => {
    if (!(target instanceof Element)) {
      return false;
    }

    return target.closest("button, a, input, textarea, select, [role='button']") != null;
  };

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!wrapperRef.current?.contains(e.target as Node)) {
      return;
    }

    if (isInteractiveTarget(e.target)) {
      return;
    }

    e.preventDefault();

    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        return;
      }

      if (isInteractiveTarget(e.target)) {
        return;
      }

      e.preventDefault();

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const deltaX = endX - startX;
      const deltaY = endY - startY;

      if (
        Math.abs(deltaX) < swipeThreshold &&
        Math.abs(deltaY) < swipeThreshold
      ) {
        setStartX(0);
        setStartY(0);
        return;
      }

      onSwipe({ deltaX, deltaY });

      setStartX(0);
      setStartY(0);
    },
    [startX, startY, onSwipe],
  );

  useEffect(() => {
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd]);

  return <div ref={wrapperRef}>{children}</div>;
}
