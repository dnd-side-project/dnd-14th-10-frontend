import { useCallback, useEffect, useRef, useState } from 'react';

const DRAG_THRESHOLD = 5;

interface UseDragScrollReturn<T extends HTMLElement> {
  ref: React.RefObject<T | null>;
  isDragged: boolean;
}

export const useDragScroll = <T extends HTMLElement>(): UseDragScrollReturn<T> => {
  const ref = useRef<T>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const movedDistance = useRef(0);
  const [isDragged, setIsDragged] = useState(false);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    isDragging.current = true;
    movedDistance.current = 0;
    setIsDragged(false);
    startX.current = e.pageX - ref.current.offsetLeft;
    scrollLeft.current = ref.current.scrollLeft;
    ref.current.style.cursor = 'grabbing';
    ref.current.style.userSelect = 'none';
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = x - startX.current;
    movedDistance.current = Math.abs(walk);

    if (movedDistance.current > DRAG_THRESHOLD) {
      setIsDragged(true);
    }

    ref.current.scrollLeft = scrollLeft.current - walk * 1.5;
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!ref.current) return;
    isDragging.current = false;
    ref.current.style.cursor = 'grab';
    ref.current.style.removeProperty('user-select');

    setTimeout(() => setIsDragged(false), 0);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.style.cursor = 'grab';
    element.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseUp);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  return { ref, isDragged };
};
