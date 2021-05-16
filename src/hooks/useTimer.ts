import { useEffect, useMemo, useState } from 'react';

function getTimeLeft(timestamp: number) {
  const now = Math.floor(Date.now() / 1000);
  return Math.max(0, timestamp - now);
}

export function useTimer(timestamp: number) {
  const initialValue = useMemo(() => getTimeLeft(timestamp), [timestamp]);
  const [timeLeft, setTimeLeft] = useState(initialValue);

  useEffect(() => {
    const interval = setInterval(() => {
      const value = getTimeLeft(timestamp);
      setTimeLeft(value);
      if (value === 0) {
        clearInterval(interval);
      }
    });

    return () => {
      clearInterval(interval);
    };
  }, [timestamp]);

  return timeLeft;
}
