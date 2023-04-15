import { createContext, ReactNode, useState } from "react";
import { toast } from "react-toastify";

interface NotificationContextData {
  message: { success?: string, error?: string },
  showToast: (message: { success?: string; error?: string; }) => void
}

interface ResponseProviderProps {
  children: ReactNode,
}

export const NotificationContext = createContext({} as NotificationContextData);

export function ResponseProvider({ children }: ResponseProviderProps) {

  const [message, setMessage] = useState<{ success?: string, error?: string }>({})

  function showToast(message: { success?: string, error?: string }) {

    if (message.success) {
      toast.success(message.success, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      })
    } else {
      toast.error(message.error, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      })
    }

    setMessage(message)
  }

  return (
    <NotificationContext.Provider
      value={{
        message,
        showToast
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}