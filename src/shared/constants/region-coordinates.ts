/**
 * 지역 코드별 위/경도 좌표 매핑
 *
 * @description
 * - 각 지역의 중심 좌표 (대표 좌표)
 * - 데이터 출처: 행정안전부 공공데이터 + 네이버/카카오 지도 기준
 * - 생성일: 2026-02-22
 *
 * @example
 * const coordinate = REGION_COORDINATES[1168000000]; // 서울 강남구
 * console.log(coordinate.latitude, coordinate.longitude);
 */

export interface RegionCoordinate {
  latitude: number;
  longitude: number;
}

export const REGION_COORDINATES: Record<number, RegionCoordinate> = {
  // 서울
  1168000000: { latitude: 37.5172, longitude: 127.0473 }, // 강남구
  1174000000: { latitude: 37.5301, longitude: 127.1238 }, // 강동구
  1130500000: { latitude: 37.6396, longitude: 127.0257 }, // 강북구
  1150000000: { latitude: 37.5509, longitude: 126.8495 }, // 강서구
  1162000000: { latitude: 37.4784, longitude: 126.9516 }, // 관악구
  1121500000: { latitude: 37.5384, longitude: 127.0822 }, // 광진구
  1153000000: { latitude: 37.4954, longitude: 126.8874 }, // 구로구
  1154500000: { latitude: 37.4519, longitude: 126.902 }, // 금천구
  1135000000: { latitude: 37.6542, longitude: 127.0568 }, // 노원구
  1132000000: { latitude: 37.6688, longitude: 127.0471 }, // 도봉구
  1123000000: { latitude: 37.5744, longitude: 127.0399 }, // 동대문구
  1159000000: { latitude: 37.5124, longitude: 126.9393 }, // 동작구
  1144000000: { latitude: 37.5663, longitude: 126.9019 }, // 마포구
  1141000000: { latitude: 37.5791, longitude: 126.9368 }, // 서대문구
  1165000000: { latitude: 37.4837, longitude: 127.0324 }, // 서초구
  1120000000: { latitude: 37.5634, longitude: 127.0371 }, // 성동구
  1129000000: { latitude: 37.5894, longitude: 127.0167 }, // 성북구
  1171000000: { latitude: 37.5145, longitude: 127.1059 }, // 송파구
  1147000000: { latitude: 37.5172, longitude: 126.8664 }, // 양천구
  1156000000: { latitude: 37.5264, longitude: 126.8962 }, // 영등포구
  1117000000: { latitude: 37.5384, longitude: 126.9654 }, // 용산구
  1138000000: { latitude: 37.6176, longitude: 126.9227 }, // 은평구
  1111000000: { latitude: 37.5735, longitude: 126.9788 }, // 종로구
  1114000000: { latitude: 37.5641, longitude: 126.9979 }, // 중구
  1126000000: { latitude: 37.6063, longitude: 127.0925 }, // 중랑구

  // 부산
  2644000000: { latitude: 35.2121, longitude: 128.9798 }, // 강서구
  2641000000: { latitude: 35.2428, longitude: 129.0917 }, // 금정구
  2671000000: { latitude: 35.2447, longitude: 129.2222 }, // 기장군
  2629000000: { latitude: 35.1361, longitude: 129.0858 }, // 남구
  2617000000: { latitude: 35.1296, longitude: 129.0454 }, // 동구
  2626000000: { latitude: 35.2045, longitude: 129.0839 }, // 동래구
  2623000000: { latitude: 35.163, longitude: 129.053 }, // 부산진구
  2632000000: { latitude: 35.195, longitude: 128.9895 }, // 북구
  2653000000: { latitude: 35.1524, longitude: 128.9898 }, // 사상구
  2638000000: { latitude: 35.1044, longitude: 128.974 }, // 사하구
  2614000000: { latitude: 35.0979, longitude: 129.0246 }, // 서구
  2650000000: { latitude: 35.1854, longitude: 129.1134 }, // 수영구
  2647000000: { latitude: 35.1761, longitude: 129.0796 }, // 연제구
  2620000000: { latitude: 35.0914, longitude: 129.0679 }, // 영도구
  2611000000: { latitude: 35.1067, longitude: 129.0323 }, // 중구
  2635000000: { latitude: 35.1631, longitude: 129.1635 }, // 해운대구

  // 대구
  2720000000: { latitude: 35.8464, longitude: 128.5975 }, // 남구
  2729000000: { latitude: 35.8295, longitude: 128.5322 }, // 달서구
  2771000000: { latitude: 35.7744, longitude: 128.4311 }, // 달성군
  2714000000: { latitude: 35.8869, longitude: 128.6358 }, // 동구
  2723000000: { latitude: 35.8858, longitude: 128.5829 }, // 북구
  2717000000: { latitude: 35.8717, longitude: 128.5594 }, // 서구
  2726000000: { latitude: 35.8581, longitude: 128.6302 }, // 수성구
  2711000000: { latitude: 35.8694, longitude: 128.6067 }, // 중구

  // 인천
  2871000000: { latitude: 37.747, longitude: 126.4878 }, // 강화군
  2824500000: { latitude: 37.5379, longitude: 126.7379 }, // 계양구
  2820000000: { latitude: 37.4486, longitude: 126.7315 }, // 남동구
  2814000000: { latitude: 37.4739, longitude: 126.6431 }, // 동구
  2817700000: { latitude: 37.4632, longitude: 126.6505 }, // 미추홀구
  2823700000: { latitude: 37.507, longitude: 126.7219 }, // 부평구
  2826000000: { latitude: 37.5452, longitude: 126.6762 }, // 서구
  2818500000: { latitude: 37.4106, longitude: 126.6781 }, // 연수구
  2872000000: { latitude: 37.4442, longitude: 126.6362 }, // 옹진군
  2811000000: { latitude: 37.4738, longitude: 126.6214 }, // 중구

  // 광주
  2920000000: { latitude: 35.1396, longitude: 126.7934 }, // 광산구
  2915500000: { latitude: 35.1329, longitude: 126.9026 }, // 남구
  2911000000: { latitude: 35.146, longitude: 126.9177 }, // 동구
  2917000000: { latitude: 35.174, longitude: 126.9118 }, // 북구
  2914000000: { latitude: 35.152, longitude: 126.8894 }, // 서구

  // 대전
  3023000000: { latitude: 36.3464, longitude: 127.4153 }, // 대덕구
  3011000000: { latitude: 36.3313, longitude: 127.4549 }, // 동구
  3017000000: { latitude: 36.3553, longitude: 127.3831 }, // 서구
  3020000000: { latitude: 36.3621, longitude: 127.3567 }, // 유성구
  3014000000: { latitude: 36.3255, longitude: 127.4211 }, // 중구

  // 울산
  3114000000: { latitude: 35.5438, longitude: 129.3309 }, // 남구
  3117000000: { latitude: 35.5049, longitude: 129.4165 }, // 동구
  3120000000: { latitude: 35.5826, longitude: 129.3614 }, // 북구
  3171000000: { latitude: 35.5219, longitude: 129.2428 }, // 울주군
  3111000000: { latitude: 35.569, longitude: 129.3326 }, // 중구

  // 세종
  3611000000: { latitude: 36.48, longitude: 127.289 }, // 세종시

  // 경기
  4182000000: { latitude: 37.8314, longitude: 127.5105 }, // 가평군
  4128100000: { latitude: 37.6658, longitude: 126.8327 }, // 고양시 덕양구
  4128500000: { latitude: 37.6988, longitude: 126.7702 }, // 고양시 일산동구
  4128700000: { latitude: 37.6773, longitude: 126.7427 }, // 고양시 일산서구
  4129000000: { latitude: 37.4293, longitude: 126.9877 }, // 과천시
  4121000000: { latitude: 37.4784, longitude: 126.8661 }, // 광명시
  4161000000: { latitude: 37.4294, longitude: 127.2558 }, // 광주시
  4131000000: { latitude: 37.5943, longitude: 127.1296 }, // 구리시
  4141000000: { latitude: 37.3617, longitude: 126.9353 }, // 군포시
  4157000000: { latitude: 37.6152, longitude: 126.7157 }, // 김포시
  4136000000: { latitude: 37.6361, longitude: 127.2167 }, // 남양주시
  4125000000: { latitude: 37.9034, longitude: 127.0604 }, // 동두천시
  4119000000: { latitude: 37.4989, longitude: 126.7831 }, // 부천시
  4113500000: { latitude: 37.3826, longitude: 127.12 }, // 성남시 분당구
  4113100000: { latitude: 37.45, longitude: 127.1472 }, // 성남시 수정구
  4113300000: { latitude: 37.434, longitude: 127.1276 }, // 성남시 중원구
  4111300000: { latitude: 37.2636, longitude: 126.9977 }, // 수원시 권선구
  4111700000: { latitude: 37.2634, longitude: 127.0471 }, // 수원시 영통구
  4111100000: { latitude: 37.2899, longitude: 127.01 }, // 수원시 장안구
  4111500000: { latitude: 37.2793, longitude: 127.0288 }, // 수원시 팔달구
  4139000000: { latitude: 37.3798, longitude: 126.8031 }, // 시흥시
  4127300000: { latitude: 37.3236, longitude: 126.7378 }, // 안산시 단원구
  4127100000: { latitude: 37.3044, longitude: 126.8318 }, // 안산시 상록구
  4155000000: { latitude: 37.0079, longitude: 127.2797 }, // 안성시
  4117300000: { latitude: 37.3894, longitude: 126.9514 }, // 안양시 동안구
  4117100000: { latitude: 37.4387, longitude: 126.9236 }, // 안양시 만안구
  4163000000: { latitude: 37.7854, longitude: 127.0465 }, // 양주시
  4183000000: { latitude: 37.4914, longitude: 127.4873 }, // 양평군
  4167000000: { latitude: 37.2974, longitude: 127.6377 }, // 여주시
  4180000000: { latitude: 38.096, longitude: 127.0748 }, // 연천군
  4137000000: { latitude: 37.1495, longitude: 127.0772 }, // 오산시
  4146300000: { latitude: 37.2759, longitude: 127.1147 }, // 용인시 기흥구
  4146500000: { latitude: 37.3245, longitude: 127.0965 }, // 용인시 수지구
  4146100000: { latitude: 37.2342, longitude: 127.2017 }, // 용인시 처인구
  4143000000: { latitude: 37.3449, longitude: 126.9683 }, // 의왕시
  4115000000: { latitude: 37.7381, longitude: 127.0338 }, // 의정부시
  4150000000: { latitude: 37.2722, longitude: 127.435 }, // 이천시
  4148000000: { latitude: 37.7598, longitude: 126.78 }, // 파주시
  4122000000: { latitude: 36.9922, longitude: 127.1128 }, // 평택시
  4165000000: { latitude: 38.0311, longitude: 127.2005 }, // 포천시
  4145000000: { latitude: 37.5393, longitude: 127.2145 }, // 하남시
  4159000000: { latitude: 37.1993, longitude: 126.8311 }, // 화성시

  // 강원
  4211000000: { latitude: 37.8813, longitude: 127.73 }, // 춘천시
  4213000000: { latitude: 37.3422, longitude: 127.9202 }, // 원주시
  4215000000: { latitude: 37.7519, longitude: 128.8761 }, // 강릉시
  4217000000: { latitude: 37.5247, longitude: 129.1144 }, // 동해시
  4219000000: { latitude: 37.164, longitude: 128.9856 }, // 태백시
  4221000000: { latitude: 38.207, longitude: 128.5918 }, // 속초시
  4223000000: { latitude: 37.4499, longitude: 129.1656 }, // 삼척시
  4272000000: { latitude: 37.6971, longitude: 127.8888 }, // 홍천군
  4273000000: { latitude: 37.4825, longitude: 127.9847 }, // 횡성군
  4275000000: { latitude: 37.1836, longitude: 128.4618 }, // 영월군
  4276000000: { latitude: 37.3706, longitude: 128.39 }, // 평창군
  4277000000: { latitude: 37.3802, longitude: 128.6587 }, // 정선군
  4278000000: { latitude: 38.1467, longitude: 127.3136 }, // 철원군
  4279000000: { latitude: 38.1063, longitude: 127.7084 }, // 화천군
  4280000000: { latitude: 38.0659, longitude: 127.9897 }, // 양구군
  4281000000: { latitude: 38.0695, longitude: 128.1706 }, // 인제군
  4282000000: { latitude: 38.3806, longitude: 128.4691 }, // 고성군
  4283000000: { latitude: 38.0751, longitude: 128.619 }, // 양양군

  // 충북
  4311100000: { latitude: 36.6377, longitude: 127.4896 }, // 청주시 상당구
  4311200000: { latitude: 36.6371, longitude: 127.4373 }, // 청주시 서원구
  4311400000: { latitude: 36.6359, longitude: 127.4881 }, // 청주시 청원구
  4311300000: { latitude: 36.6357, longitude: 127.4456 }, // 청주시 흥덕구
  4313000000: { latitude: 37.0079, longitude: 127.9253 }, // 충주시
  4315000000: { latitude: 37.1326, longitude: 128.1907 }, // 제천시
  4372000000: { latitude: 36.4895, longitude: 127.7295 }, // 보은군
  4373000000: { latitude: 36.3062, longitude: 127.5722 }, // 옥천군
  4374000000: { latitude: 36.175, longitude: 127.7844 }, // 영동군
  4374500000: { latitude: 36.7794, longitude: 127.5818 }, // 증평군
  4375000000: { latitude: 36.8555, longitude: 127.4357 }, // 진천군
  4376000000: { latitude: 36.8155, longitude: 127.7878 }, // 괴산군
  4377000000: { latitude: 36.994, longitude: 127.6925 }, // 음성군
  4380000000: { latitude: 37.0101, longitude: 128.3662 }, // 단양군

  // 충남
  4413100000: { latitude: 36.8094, longitude: 127.1538 }, // 천안시 동남구
  4413300000: { latitude: 36.8151, longitude: 127.1139 }, // 천안시 서북구
  4415000000: { latitude: 36.4465, longitude: 127.1192 }, // 공주시
  4418000000: { latitude: 36.333, longitude: 126.6128 }, // 보령시
  4420000000: { latitude: 36.7898, longitude: 127.0019 }, // 아산시
  4421000000: { latitude: 36.7848, longitude: 126.4504 }, // 서산시
  4423000000: { latitude: 36.1869, longitude: 127.0986 }, // 논산시
  4425000000: { latitude: 36.2742, longitude: 127.2487 }, // 계룡시
  4427000000: { latitude: 36.8932, longitude: 126.6471 }, // 당진시
  4471000000: { latitude: 36.1088, longitude: 127.4881 }, // 금산군
  4476000000: { latitude: 36.2756, longitude: 126.91 }, // 부여군
  4477000000: { latitude: 36.0812, longitude: 126.6919 }, // 서천군
  4479000000: { latitude: 36.4594, longitude: 126.8025 }, // 청양군
  4480000000: { latitude: 36.6012, longitude: 126.665 }, // 홍성군
  4481000000: { latitude: 36.6819, longitude: 126.8468 }, // 예산군
  4482500000: { latitude: 36.7456, longitude: 126.2983 }, // 태안군

  // 전북
  4511100000: { latitude: 35.8242, longitude: 127.148 }, // 전주시 완산구
  4511300000: { latitude: 35.8495, longitude: 127.1298 }, // 전주시 덕진구
  4513000000: { latitude: 35.9676, longitude: 126.7365 }, // 군산시
  4514000000: { latitude: 35.9484, longitude: 126.9544 }, // 익산시
  4518000000: { latitude: 35.5697, longitude: 126.856 }, // 정읍시
  4519000000: { latitude: 35.4164, longitude: 127.3903 }, // 남원시
  4521000000: { latitude: 35.8015, longitude: 126.8805 }, // 김제시
  4571000000: { latitude: 35.9058, longitude: 127.1609 }, // 완주군
  4572000000: { latitude: 35.7916, longitude: 127.4241 }, // 진안군
  4573000000: { latitude: 35.9042, longitude: 127.6605 }, // 무주군
  4574000000: { latitude: 35.6473, longitude: 127.5208 }, // 장수군
  4575000000: { latitude: 35.6177, longitude: 127.2864 }, // 임실군
  4577000000: { latitude: 35.3745, longitude: 127.1374 }, // 순창군
  4579000000: { latitude: 35.4349, longitude: 126.7022 }, // 고창군
  4580000000: { latitude: 35.7318, longitude: 126.7339 }, // 부안군

  // 전남
  4611000000: { latitude: 34.7937, longitude: 126.3887 }, // 목포시
  4613000000: { latitude: 34.7604, longitude: 127.6622 }, // 여수시
  4615000000: { latitude: 34.9507, longitude: 127.4872 }, // 순천시
  4617000000: { latitude: 35.016, longitude: 126.7107 }, // 나주시
  4623000000: { latitude: 34.9406, longitude: 127.6956 }, // 광양시
  4671000000: { latitude: 35.3215, longitude: 126.9881 }, // 담양군
  4672000000: { latitude: 35.2819, longitude: 127.2918 }, // 곡성군
  4673000000: { latitude: 35.2023, longitude: 127.4628 }, // 구례군
  4677000000: { latitude: 34.6114, longitude: 127.2754 }, // 고흥군
  4678000000: { latitude: 34.7714, longitude: 127.0799 }, // 보성군
  4679000000: { latitude: 35.0642, longitude: 126.9868 }, // 화순군
  4680000000: { latitude: 34.6816, longitude: 126.9066 }, // 장흥군
  4681000000: { latitude: 34.6417, longitude: 126.7675 }, // 강진군
  4682000000: { latitude: 34.5736, longitude: 126.599 }, // 해남군
  4683000000: { latitude: 34.8004, longitude: 126.6962 }, // 영암군
  4684000000: { latitude: 34.9905, longitude: 126.4808 }, // 무안군
  4686000000: { latitude: 35.0658, longitude: 126.5168 }, // 함평군
  4687000000: { latitude: 35.2772, longitude: 126.5119 }, // 영광군
  4688000000: { latitude: 35.2979, longitude: 126.7838 }, // 장성군
  4689000000: { latitude: 34.3114, longitude: 126.7553 }, // 완도군
  4690000000: { latitude: 34.4869, longitude: 126.2633 }, // 진도군
  4691000000: { latitude: 34.8257, longitude: 126.1069 }, // 신안군

  // 경북
  4711100000: { latitude: 36.019, longitude: 129.3435 }, // 포항시 남구
  4711300000: { latitude: 36.0889, longitude: 129.3614 }, // 포항시 북구
  4713000000: { latitude: 35.8562, longitude: 129.2247 }, // 경주시
  4715000000: { latitude: 36.1399, longitude: 128.1137 }, // 김천시
  4717000000: { latitude: 36.5684, longitude: 128.7294 }, // 안동시
  4719000000: { latitude: 36.1195, longitude: 128.3445 }, // 구미시
  4721000000: { latitude: 36.8065, longitude: 128.6236 }, // 영주시
  4723000000: { latitude: 35.9733, longitude: 128.9387 }, // 영천시
  4725000000: { latitude: 36.4106, longitude: 128.1595 }, // 상주시
  4728000000: { latitude: 36.5864, longitude: 128.1866 }, // 문경시
  4729000000: { latitude: 35.825, longitude: 128.7414 }, // 경산시
  4772000000: { latitude: 36.2427, longitude: 128.5718 }, // 군위군
  4773000000: { latitude: 36.3524, longitude: 128.6975 }, // 의성군
  4775000000: { latitude: 36.4363, longitude: 129.057 }, // 청송군
  4776000000: { latitude: 36.6668, longitude: 129.1124 }, // 영양군
  4777000000: { latitude: 36.4152, longitude: 129.3657 }, // 영덕군
  4782000000: { latitude: 35.6476, longitude: 128.4892 }, // 청도군
  4783000000: { latitude: 35.7261, longitude: 128.2626 }, // 고령군
  4784000000: { latitude: 35.9192, longitude: 128.2809 }, // 성주군
  4785000000: { latitude: 35.9944, longitude: 128.4014 }, // 칠곡군
  4790000000: { latitude: 36.6546, longitude: 128.4524 }, // 예천군
  4792000000: { latitude: 36.8931, longitude: 128.7325 }, // 봉화군
  4793000000: { latitude: 36.993, longitude: 129.4003 }, // 울진군
  4794000000: { latitude: 37.4845, longitude: 130.9058 }, // 울릉군

  // 경남
  4812100000: { latitude: 35.2284, longitude: 128.6811 }, // 창원시 의창구
  4812300000: { latitude: 35.2186, longitude: 128.69 }, // 창원시 성산구
  4812500000: { latitude: 35.1979, longitude: 128.5731 }, // 창원시 마산합포구
  4812700000: { latitude: 35.2286, longitude: 128.5827 }, // 창원시 마산회원구
  4812900000: { latitude: 35.1416, longitude: 128.7099 }, // 창원시 진해구
  4817000000: { latitude: 35.18, longitude: 128.1076 }, // 진주시
  4822000000: { latitude: 34.8544, longitude: 128.4331 }, // 통영시
  4824000000: { latitude: 35.0036, longitude: 128.0642 }, // 사천시
  4825000000: { latitude: 35.2285, longitude: 128.8894 }, // 김해시
  4827000000: { latitude: 35.5039, longitude: 128.7462 }, // 밀양시
  4831000000: { latitude: 34.8808, longitude: 128.6211 }, // 거제시
  4833000000: { latitude: 35.335, longitude: 129.0372 }, // 양산시
  4872000000: { latitude: 35.3222, longitude: 128.2619 }, // 의령군
  4873000000: { latitude: 35.2722, longitude: 128.4065 }, // 함안군
  4874000000: { latitude: 35.5442, longitude: 128.4924 }, // 창녕군
  4882000000: { latitude: 34.9732, longitude: 128.3221 }, // 고성군
  4884000000: { latitude: 34.8375, longitude: 127.8924 }, // 남해군
  4885000000: { latitude: 35.0673, longitude: 127.7514 }, // 하동군
  4886000000: { latitude: 35.415, longitude: 127.8732 }, // 산청군
  4887000000: { latitude: 35.5204, longitude: 127.7252 }, // 함양군
  4888000000: { latitude: 35.6849, longitude: 127.9095 }, // 거창군
  4889000000: { latitude: 35.5664, longitude: 128.1657 }, // 합천군

  // 제주
  5011000000: { latitude: 33.4996, longitude: 126.5312 }, // 제주시
  5013000000: { latitude: 33.2541, longitude: 126.56 }, // 서귀포시
};

/**
 * regionCode로 좌표 조회
 */
export const getCoordinateByRegionCode = (regionCode: number): RegionCoordinate | null => {
  return REGION_COORDINATES[regionCode] || null;
};

/**
 * regionCode로 좌표 조회 (nullable 처리)
 */
export const getRegionCoordinate = (regionCode?: number | null): RegionCoordinate | null => {
  if (!regionCode) return null;
  return getCoordinateByRegionCode(regionCode);
};
