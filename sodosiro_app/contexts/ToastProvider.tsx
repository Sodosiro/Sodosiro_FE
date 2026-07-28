import Toast from "@/components/common/Toast";
import { createContext, ReactNode, useContext, useState } from "react";

type ToastContextType = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const showToast = (text: string) => {
    setMessage(text);
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
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
