import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ scrollRef }) {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, [pathname, scrollRef]);

  return null;
}
