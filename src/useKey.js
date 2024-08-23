import { useEffect } from "react";

function useKey(key, action) {
  useEffect(() => {
    const callback = (e) => {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
        console.log("CLOSING");
      }
    };

    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback); //clean up
    };
  }, [action, key]);
}

export default useKey;
