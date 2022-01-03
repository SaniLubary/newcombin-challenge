import { useEffect, useRef } from "react";

const IdleStateDetector = ({ delay, onIdle, onActive }: { delay: any, onIdle: any, onActive: any}) => {
  const timeoutId = useRef<number>();

  useEffect(() => {
    setup();

    return () => {
      cleanUp();
    };
  }, []);

  const setup = () => {
    document.addEventListener("mousemove", resetTimer, false);
    document.addEventListener("mousedown", resetTimer, false);
    document.addEventListener("keypress", resetTimer, false);
    document.addEventListener("DOMMouseScroll", resetTimer, false);
    document.addEventListener("mousewheel", resetTimer, false);
    document.addEventListener("touchmove", resetTimer, false);
    document.addEventListener("MSPointerMove", resetTimer, false);
    
    startTimer();
  };

  const cleanUp = () => {
    document.removeEventListener("mousemove", resetTimer);
    document.removeEventListener("mousedown", resetTimer);
    document.removeEventListener("keypress", resetTimer);
    document.removeEventListener("DOMMouseScroll", resetTimer);
    document.removeEventListener("mousewheel", resetTimer);
    document.removeEventListener("touchmove", resetTimer);
    document.removeEventListener("MSPointerMove", resetTimer);

    clearTimeout(timeoutId.current);
  };

  const startTimer = () => {
    timeoutId.current = setTimeout(goInactive, delay);
  };

  const resetTimer = () => {
    clearTimeout(timeoutId.current);
    goActive();
  };

  const goInactive = () => {
    onIdle && onIdle();

    resetTimer();
  };

  const goActive = () => {
    onActive && onActive();
    startTimer();
  };

  return null;
};

export default IdleStateDetector;