export const getCurrentAddress = (): Promise<{ lat: number; lng: number; address: string }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error('Geolocation을 지원하지 않는 브라우저입니다.'));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;

        window.naver.maps.Service.reverseGeocode(
          {
            coords: new window.naver.maps.LatLng(lat, lng),
          },
          (
            status: naver.maps.Service.Status,
            response: naver.maps.Service.ReverseGeocodeResponse,
          ) => {
            if (status !== window.naver.maps.Service.Status.OK) {
              return reject(new Error('주소 변환 실패'));
            }

            const address = response.v2.address.jibunAddress;
            resolve({ lat, lng, address });
          },
        );
      },
      (error) => reject(error),
      { enableHighAccuracy: true, timeout: 5000 },
    );
  });
};
