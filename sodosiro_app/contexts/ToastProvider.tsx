import Toast from "@/components/common/Toast";
import { createContext, ReactNode, useContext, useRef, useState } from "react";

type ToastContextType = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (text: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setMessage(text);
    setVisible(true);

    timeoutRef.current = setTimeout(() => {
      setVisible(false);
      timeoutRef.current = null;
    }, 2000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast visible={visible} message={message} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}
