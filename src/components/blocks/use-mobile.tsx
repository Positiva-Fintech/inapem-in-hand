import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize event listener
    window.addEventListener("resize", checkMobile);
    
    // Clean up the event listener
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}
