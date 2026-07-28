import { useCallback, useRef, useState } from "react";

const DEFAULT_DURATION = 2000;

export function useToast() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((text: string, duration = DEFAULT_DURATION) => {
    setMessage(text);
    setVisible(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setVisible(false);
    }, duration);
  }, []);

  return {
    visible,
    message,
    showToast,
  };
}
