import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router doesn't reset scroll position on navigation by default.
 * Without this, clicking a nav link while scrolled down on one page
 * lands you at that same scroll position on the next page instead of
 * the top. Mounted once inside BrowserRouter in App.tsx.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
