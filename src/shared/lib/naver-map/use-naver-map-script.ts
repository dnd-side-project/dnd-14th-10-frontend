import { useEffect, useState } from 'react';

export const useNaverMapScript = () => {
  const [isLoaded, setIsLoaded] = useState(() => !!window.naver?.maps?.Service);

  useEffect(() => {
    if (isLoaded) return;

    const interval = setInterval(() => {
      if (window.naver?.maps?.Service) {
        setIsLoaded(true);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isLoaded]);

  return isLoaded;
};
