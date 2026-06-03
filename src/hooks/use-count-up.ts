import { useEffect, useRef, useState } from "react";

type UseCountUpOptions = {
  end: number;
  start?: number;
  duration?: number;
  triggerOnce?: boolean;
};

const VISIBILITY_THRESHOLD = 0.35;

export function useCountUp({
  end,
  start = 0,
  duration = 1400,
  triggerOnce = true,
}: UseCountUpOptions) {
  const [value, setValue] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const target = targetRef.current;

    if (!target) return;

    const setVisible = (visible: boolean) => {
      if (visible) {
        if (triggerOnce && hasTriggeredRef.current) {
          return;
        }

        hasTriggeredRef.current = true;
        setIsVisible(true);
        return;
      }

      if (!triggerOnce) {
        setIsVisible(false);
      }
    };

    const isInitiallyVisible = () => {
      const rect = target.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

      return (
        rect.top < viewportHeight && rect.bottom > 0 && rect.left < viewportWidth && rect.right > 0
      );
    };

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: VISIBILITY_THRESHOLD },
    );

    observerRef.current.observe(target);
    setVisible(isInitiallyVisible());

    return () => {
      observerRef.current?.disconnect();
    };
  }, [triggerOnce]);

  useEffect(() => {
    if (!isVisible) {
      if (!triggerOnce) {
        setValue(start);
      }

      return;
    }

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) {
      setValue(end);
      return;
    }

    setValue(start);

    let frame = 0;
    const startedAt = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.round(start + (end - start) * eased);

      setValue(nextValue);

      if (progress < 1) {
        frame = window.requestAnimationFrame(step);
      }
    };

    frame = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [duration, end, isVisible, start, triggerOnce]);

  return { targetRef, value };
}
