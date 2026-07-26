import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Forces the window to scroll to the absolute top on every route change.
 * Uses `auto` (instant) behavior so navigation feels crisp, not janky.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable smooth scroll for this jump so it's instant on navigation
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    // Some browsers need a tick before restoring
    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = prev;
    });
  }, [pathname]);

  return null;
}
