import { useEffect, useState } from "react";

/**
 * Returns true only while the visitor is between the first screen and the
 * footer, so fixed floating buttons don't cover the hero (which already has
 * its own CTAs) or the footer's contact details.
 */
export function useHideNearFooter() {
  const [pastFirstScreen, setPastFirstScreen] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastFirstScreen(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const footer = document.querySelector("footer");
    const observer = new IntersectionObserver(
      ([entry]) => setFooterInView(entry.isIntersecting),
      { rootMargin: "0px 0px -10% 0px" }
    );
    if (footer) observer.observe(footer);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return pastFirstScreen && !footerInView;
}
