import { useEffect, useRef, useState } from "react";

interface UseRevealOnScrollOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useRevealOnScroll({
  threshold = 0.1,
  rootMargin = "0px",
}: UseRevealOnScrollOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}

export default useRevealOnScroll;