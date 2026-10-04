import { useEffect, useState } from "react";

/**
 * Returns false once the page's <footer> scrolls into view, so fixed
 * floating buttons can hide themselves rather than overlapping the
 * footer's own content and CTAs.
 */
export function useHideNearFooter() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  return visible;
}
