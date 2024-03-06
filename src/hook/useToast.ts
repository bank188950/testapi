import { useState, useEffect } from "react";

export const useToast = (initialState = false, duration = 3000) => {
  const [showToast, setShowToast] = useState(initialState);

  const showMessageToast = () => {
    setShowToast(true);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (showToast) {
      timeoutId = setTimeout(() => {
        setShowToast(false);
      }, duration);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [showToast, duration]);

  return { showToast, showMessageToast };
};
