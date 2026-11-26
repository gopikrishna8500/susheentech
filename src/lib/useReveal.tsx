import { useEffect, useRef, useState } from "react";

export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

export function Reveal({
  children,
  className = "",
  variant = "up",
  delay = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "up" | "left" | "right" | "scale";
  delay?: string;
  as?: React.ElementType;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const variantClass =
    variant === "left" ? "reveal-left" : variant === "right" ? "reveal-right" : variant === "scale" ? "reveal-scale" : "reveal";
  return (
    <Tag ref={ref} className={`${variantClass} ${delay} ${visible ? "reveal-visible" : ""} ${className}`}>
      {children}
    </Tag>
  );
}

export function AnimatedCounter({
  value,
  suffix = "",
  duration = 2000,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const { ref, visible } = useReveal<HTMLSpanElement>();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
      else setDisplay(value);
    };
    requestAnimationFrame(tick);
    return () => { start = 0; };
  }, [visible, value, duration]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}{suffix}
    </span>
  );
}
