import { useCallback, useEffect, useRef, useState } from 'react';

const DRAG_THRESHOLD = 5;

interface UseDragScrollReturn<T extends HTMLElement> {
  ref: (node: T | null) => void;
  isDragged: boolean;
}

export const useDragScroll = <T extends HTMLElement>(): UseDragScrollReturn<T> => {
  const elementRef = useRef<T | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const movedDistance = useRef(0);
  const [isDragged, setIsDragged] = useState(false);
  const [, setMounted] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      movedDistance.current = 0;
      setIsDragged(false);
      const rect = element.getBoundingClientRect();
      startX.current = e.clientX - rect.left;
      scrollLeft.current = element.scrollLeft;
      element.style.cursor = 'grabbing';
      element.style.userSelect = 'none';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const walk = x - startX.current;
      movedDistance.current = Math.abs(walk);

      if (movedDistance.current > DRAG_THRESHOLD) {
        setIsDragged(true);
      }

      element.scrollLeft = scrollLeft.current - walk * 1.5;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      element.style.cursor = 'grab';
      element.style.removeProperty('user-select');
      setTimeout(() => setIsDragged(false), 0);
    };

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
  });

  const ref = useCallback((node: T | null) => {
    elementRef.current = node;
    setMounted((prev) => !prev);
  }, []);

  return { ref, isDragged };
};
