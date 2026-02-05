import { useEffect, useState } from 'react';

export const useNaverMapScript = (clientId: string) => {
  const [isLoaded, setIsLoaded] = useState(() => {
    return !!(typeof window !== 'undefined' && window.naver && window.naver.maps);
  });

  useEffect(() => {
    if (isLoaded || document.getElementById('naver-map-script')) {
      return;
    }

    const script = document.createElement('script');
    script.id = 'naver-map-script';
    script.type = 'text/javascript';
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}&submodules=geocoder`;
    script.async = true;

    script.onload = () => setIsLoaded(true);
    document.head.appendChild(script);

    return () => {};
  }, [clientId, isLoaded]);

  return isLoaded;
};
