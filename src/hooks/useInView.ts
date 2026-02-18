import { useEffect, useRef, useState } from 'react';

export function useInView(options?: { once?: boolean; margin?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const { once = true, margin = '0px' } = options ?? {};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold: 0, rootMargin: margin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, margin]);

  return { ref, isInView };
}
