# GoJak - 현재 위치 기반 협업 공간 추천 앱

현재 위치를 기반으로 주변 카페, 스터디룸, 공유오피스 등 협업 공간을 추천하고 탐색할 수 있는 모바일 웹 서비스입니다.

## 기술 스택

| 분류       | 기술                        |
| ---------- | --------------------------- |
| 프레임워크 | React 19, TypeScript 5.9    |
| 빌드 도구  | Vite                        |
| 라우팅     | React Router DOM 7          |
| 전역 상태  | Zustand 5                   |
| 서버 상태  | TanStack React Query 5      |
| 폼         | React Hook Form + Zod       |
| 스타일링   | Tailwind CSS 4              |
| 지도       | Naver Maps API              |
| 인증       | 카카오 OAuth                |
| 아키텍처   | Feature-Sliced Design (FSD) |

## 프로젝트 구조

[Feature-Sliced Design](https://feature-sliced.design/) 아키텍처를 따릅니다.

```
src/
├── app/          # 앱 진입점, 라우터, 레이아웃, Axios 인터셉터
├── pages/        # 라우트별 페이지 컴포넌트
├── features/     # 비즈니스 로직 단위 (인증, 리뷰, 장소 등록 등)
├── entities/     # 도메인 엔티티 (장소, 리뷰, 사용자, 배지 등)
├── widgets/      # 여러 기능을 조합한 복합 UI
└── shared/       # 공통 컴포넌트, API 클라이언트, 훅, 타입
```

### 파일명 규칙

- 컴포넌트: PascalCase (`PlaceCard.tsx`)
- 나머지: kebab-case (`use-location-store.ts`)

## 주요 기능

### 홈 - 위치 기반 장소 추천

현재 위치(GPS) 또는 프로필에 등록된 주소를 기준으로 반경 5km 이내의 협업 공간을 세 가지 섹션으로 추천합니다.

<table>
  <tr>
    <!-- <td><img src="docs/screenshots/home-1.png" width="180" /></td> -->
    <!-- <td><img src="docs/screenshots/home-2.png" width="180" /></td> -->
    <!-- <td><img src="docs/screenshots/home-3.png" width="180" /></td> -->
  </tr>
</table>

- **카테고리 탭**: 카페 / 공공시설 전환
- **인기있는 작업 공간**: 위치 기반 인기순 목록
- **맞춤 추천**:
  - 로그인 상태 — 나와 비슷한 사용자들이 좋아한 공간
  - 비로그인 상태 — 랜덤 테마 기반 추천 (조용한 분위기, 넓은 공간, 콘센트 많은 곳 등)
- **주변 신규 공간**: 최근 등록된 장소 목록
- 각 섹션의 "더보기"를 누르면 지도 화면으로 이동해 전체 목록을 확인할 수 있습니다.

### 지도 탐색

Naver Maps API를 활용해 장소를 지도 위에서 탐색합니다.

<table>
  <tr>
    <!-- <td><img src="docs/screenshots/map-recommended.png" width="180" /></td> -->
    <!-- <td><img src="docs/screenshots/map-search.png" width="180" /></td> -->
  </tr>
</table>

- **추천 지도** (`/map/recommended`): 홈에서 선택한 추천 유형(인기/유사/신규/테마) 기반으로 마커 표시. 지도를 이동하면 해당 영역 기준으로 목록 자동 갱신
- **검색 지도** (`/map/search`): 카테고리, 지역, 규모, 분위기 필터 조합으로 장소 검색. 검색 결과를 지도 마커와 하단 드로어 목록으로 동시에 표시
- 하단 드로어에서 장소를 탭하면 상세 페이지로 이동

### 장소 상세

장소에 대한 모든 정보를 한 화면에서 확인합니다.

<table>
  <tr>
    <!-- <td><img src="docs/screenshots/place-detail-1.png" width="180" /></td> -->
    <!-- <td><img src="docs/screenshots/place-detail-2.png" width="180" /></td> -->
    <!-- <td><img src="docs/screenshots/place-detail-3.png" width="180" /></td> -->
  </tr>
</table>

- 대표 이미지 갤러리, 주소, 카테고리, 평균 별점
- 공간 특성 정보: 콘센트 환경, 혼잡도, 분위기(4단계 이모지), 화장실, 층수
- Naver Maps 미니맵으로 위치 확인
- 리뷰 태그 통계 바 차트 (상위 태그 순으로 색상 그라데이션)
- 최근 리뷰 4개 미리보기 및 전체보기
- 위시리스트 토글 및 Web Share API를 통한 공유

### 장소 등록

사용자가 직접 협업 공간을 등록하는 퍼널(Funnel) 기반 4단계 플로우입니다.

<table>
  <tr>
    <!-- <td><img src="docs/screenshots/registration-1.png" width="180" /></td> -->
    <!-- <td><img src="docs/screenshots/registration-2.png" width="180" /></td> -->
    <!-- <td><img src="docs/screenshots/registration-3.png" width="180" /></td> -->
    <!-- <td><img src="docs/screenshots/registration-4.png" width="180" /></td> -->
  </tr>
</table>

1. **유형 선택**: 카페 또는 공공시설
2. **위치 검색**: Naver 검색 API로 장소명 검색 → 지도에서 위치 확인
3. **상세 정보 입력**: 콘센트 환경, 공간 크기, 혼잡도, 분위기, 영업시간, 화장실 정보, 층수, 좋은 점 태그(2~5개), 사진(최대 6장)
4. **등록 완료**: 완료 페이지에서 장소 상세로 이동

중복 장소 등록 시 409 에러를 처리해 기존 장소명을 안내합니다.

### 리뷰

Zod 스키마 기반 유효성 검사가 적용된 리뷰 작성 폼입니다.

<table>
  <tr>
    <!-- <td><img src="docs/screenshots/review-1.png" width="180" /></td> -->
    <!-- <td><img src="docs/screenshots/review-2.png" width="180" /></td> -->
  </tr>
</table>

- **별점** (1~5점, 필수)
- **좋은 점 태그** (2~5개 선택)
- **공간 평가**: 분위기, 공간 크기, 콘센트 환경, 혼잡도
- **텍스트 리뷰** (최대 1,000자)
- **사진 첨부** (최대 6장, 미리보기 제공)
- 등록 완료 시 첨부 사진 썸네일과 함께 몇 번째 리뷰인지 표시

### 마이페이지

<table>
  <tr>
    <!-- <td><img src="docs/screenshots/my-1.png" width="180" /></td> -->
    <!-- <td><img src="docs/screenshots/my-2.png" width="180" /></td> -->
  </tr>
</table>

- 프로필 정보 (닉네임, 생일, 주소, 프로필 이미지)
- 활동 통계 (등록 장소 수, 리뷰 수, 위시리스트 수)
- 최근 방문 장소
- 내가 등록한 장소 목록 (정렬 기능)
- 내 리뷰 목록 및 리뷰 수정/삭제
- 위시리스트
- 배지 컬렉션

### 배지 시스템

리뷰 작성, 장소 등록 등 활동 횟수에 따라 배지가 활성화됩니다.

<table>
  <tr>
    <!-- <td><img src="docs/screenshots/badge.png" width="180" /></td> -->
  </tr>
</table>

- 활동 유형별 카테고리로 그룹화
- 잠금/해제 상태를 아이콘으로 시각화
- 달성 개수 기준(첫 작성, 5개, 10개 등)으로 단계별 배지 제공

### 온보딩 및 인증

<table>
  <tr>
    <!-- <td><img src="docs/screenshots/login.png" width="180" /></td> -->
    <!-- <td><img src="docs/screenshots/onboarding-1.png" width="180" /></td> -->
    <!-- <td><img src="docs/screenshots/onboarding-2.png" width="180" /></td> -->
    <!-- <td><img src="docs/screenshots/onboarding-3.png" width="180" /></td> -->
  </tr>
</table>

- 카카오 OAuth 소셜 로그인
- 신규 가입 시 닉네임 → 생일(휠 피커) → 주소 순의 온보딩 플로우
- 프로필 정보는 이후 마이페이지에서 개별 수정 가능
- JWT 액세스 토큰 기반 인증, 401 시 자동 갱신 후 재요청
- 회원탈퇴: 사유 선택 → 확인 2단계 플로우

## API 연동

- 개발 환경에서는 Vite 프록시를 통해 CORS 없이 API 요청
- Naver 검색 API는 `/naver-search` 경로로 프록시
- 401 응답 시 토큰 자동 갱신 후 재요청

## 상태 관리

- **인증**: `useAuthStore` (Zustand) — accessToken, user 정보
- **위치**: `useLocationStore` (Zustand) — 현재 위치 좌표 및 주소
- **서버 데이터**: React Query
