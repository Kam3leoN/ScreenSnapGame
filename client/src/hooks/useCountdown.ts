import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Compte à rebours en secondes avec callback à zéro.
 */
export function useCountdown(
  seconds: number,
  active: boolean,
  onExpire: () => void
) {
  const [remaining, setRemaining] = useState(seconds);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    setRemaining(seconds);
  }, [seconds]);

  useEffect(() => {
    if (!active) return;
    if (remaining <= 0) {
      onExpireRef.current();
      return;
    }
    const id = window.setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(id);
  }, [active, remaining]);

  const reset = useCallback((value: number) => setRemaining(value), []);

  return { remaining, reset };
}
