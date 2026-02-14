import axios from 'axios';

interface NaverSearchItem {
  title: string;
  link: string;
  category: string;
  description: string;
  telephone: string;
  address: string;
  roadAddress: string;
  mapx: string;
  mapy: string;
}

interface NaverSearchResponse {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: NaverSearchItem[];
}

export interface PlaceSearchResult {
  placeName: string;
  address: string;
  roadAddress?: string;
  category: string;
  telephone?: string;
  // 좌표는 geocode로 별도 조회 필요
}

// HTML 태그 제거 함수
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

export async function searchPlace(query: string): Promise<PlaceSearchResult[]> {
  try {
    const response = await axios.get<NaverSearchResponse>('/naver-search/local.json', {
      params: {
        query,
        display: 10,
        sort: 'random',
      },
    });

    return response.data.items.map((item) => ({
      placeName: stripHtml(item.title),
      address: item.address,
      roadAddress: item.roadAddress || undefined,
      category: item.category,
      telephone: item.telephone || undefined,
    }));
  } catch (error) {
    console.error('장소 검색 실패:', error);
    return [];
  }
}
