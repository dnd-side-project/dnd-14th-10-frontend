import { useEffect, useState } from 'react';

declare global {
  interface Window {
    __naverMapReady?: boolean;
    __naverMapCallbacks?: (() => void)[];
  }
}

export const useNaverMapScript = () => {
  const [isLoaded, setIsLoaded] = useState(() => !!window.__naverMapReady);

  useEffect(() => {
    if (isLoaded) return;

    const cb = () => setIsLoaded(true);
    window.__naverMapCallbacks?.push(cb);

    return () => {
      const idx = window.__naverMapCallbacks?.indexOf(cb) ?? -1;
      if (idx >= 0) window.__naverMapCallbacks?.splice(idx, 1);
    };
  }, [isLoaded]);

  return isLoaded;
};
