import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Element to render. Defaults to div. */
  as?: ElementType;
  className?: string;
  /** Stagger delay in ms (kept small to protect INP/CLS). */
  delay?: number;
  /** Reveal once and stop observing (default true). */
  once?: boolean;
}

/**
 * Lightweight scroll-reveal wrapper.
 * - Uses a single IntersectionObserver per element, disconnected after firing.
 * - Animates only opacity/transform (compositor-only, no layout thrash).
 * - Honours prefers-reduced-motion and renders content immediately if unsupported.
 */
export function Reveal({ children, as, className = "", delay = 0, once = true }: RevealProps) {
  const Tag = (as || "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      className={`sr-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
