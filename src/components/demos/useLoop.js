import { useEffect, useState } from "react";
import useInView from "../../hooks/useInView.js";

// Steps a counter 0..steps-1 on a timer, only while the demo is on screen.
// Returns [ref, step]. Pauses under prefers-reduced-motion at the final step.
export default function useLoop(steps, ms, restMs = 2200) {
  const [ref, inView] = useInView(0.3);
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!inView) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(steps - 1);
      return undefined;
    }
    let t;
    const next = (s) => {
      const last = s >= steps - 1;
      t = setTimeout(() => {
        const n = last ? 0 : s + 1;
        setStep(n);
        next(n);
      }, last ? restMs : ms);
    };
    next(step);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, steps, ms, restMs]);
  return [ref, step];
}
