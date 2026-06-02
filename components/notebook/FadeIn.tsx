'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';

// Patient reveal: fade up from 8px below, once, 800ms ease-out.
// Respects prefers-reduced-motion — shows instantly with no transform.
export function FadeIn({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If reduced motion, show instantly
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 800ms ease-out, transform 800ms ease-out',
      }}
    >
      {children}
    </div>
  );
}
