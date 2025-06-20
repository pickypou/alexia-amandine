import { useState, useEffect } from "react";

export function useWindowWidth(): number {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    // Nettoyage du listener à la destruction du composant
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}
