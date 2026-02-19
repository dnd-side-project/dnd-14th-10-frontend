import { Suspense, useMemo, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import type { PlaceDetail, ReviewTag } from '@/entities/place/model/place.types';
import { usePlaceDetailQuery } from '@/entities/place/model/use-place-detail-query';
import { ReviewCard } from '@/entities/place/ui/ReviewCard';
import PlaceNotFoundPage from '@/pages/place-not-found/ui/place-not-found-page';
import calmnessCalm from '@/shared/assets/images/calm-3d.png';
import calmnessChatty from '@/shared/assets/images/chatty-3d.png';
import calmnessNoisy from '@/shared/assets/images/noisy-3d.png';
import calmnessSilent from '@/shared/assets/images/silent-3d.png';
import PlaceErrorBoundary from '@/shared/ui/error-boundary/PlaceErrorBoundary';
import BuildingIcon from '@/shared/ui/icons/Building.svg?react';
import ChevronDownIcon from '@/shared/ui/icons/ChevronDown.svg?react';
import ChevronRightIcon from '@/shared/ui/icons/ChevronRight.svg?react';
import HeartIcon from '@/shared/ui/icons/Heart.svg?react';
import MapPinIcon from '@/shared/ui/icons/MapPin.svg?react';
import OutletIcon from '@/shared/ui/icons/Outlet.svg?react';
import PeopleIcon from '@/shared/ui/icons/People.svg?react';
import RestroomIcon from '@/shared/ui/icons/Restroom.svg?react';
import ShareIcon from '@/shared/ui/icons/Share.svg?react';
import StarIcon from '@/shared/ui/icons/Star.svg?react';
import NavigationBar from '@/shared/ui/navigation-bar/NavigationBar';
import { PlaceLocationMap } from '@/widgets/place-location-map/ui/PlaceLocationMap';

function BasicInfoSection({ place }: { place: PlaceDetail }) {
  return (
    <section className='border-b border-gray-200 px-5 pt-5 pb-8'>
      <div className='mb-5 flex flex-col gap-3'>
        <h1 className='text-heading3 font-bold'>{place.name}</h1>
        <div className='flex items-center gap-1 text-gray-500'>
          <span className='text-lg'>{place.category}</span>
          <span className='h-0.5 w-0.5 rounded-full bg-gray-400' />
          <StarIcon className='text-primary-500 h-6 w-6' />
          <span className='text-lg'>
            {place.rating} ({place.reviewCount})
          </span>
        </div>
        <div className='flex flex-wrap gap-1'>
          {place.tags.map((tag) => (
            <span key={tag} className='text-primary-600 text-xs font-medium'>
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className='scrollbar-hide -mx-5 mb-5 flex gap-4 overflow-x-auto px-5'>
        {place.images.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`${place.name} 이미지 ${index + 1}`}
            className='h-[207px] w-[260px] flex-shrink-0 rounded-lg object-cover'
          />
        ))}
      </div>

      <div className='flex items-center gap-1'>
        <MapPinIcon className='h-5 w-5 text-gray-950' />
        <span className='text-base'>{place.address}</span>
      </div>
    </section>
  );
}

function getCalmnessInfo(index: number) {
  if (index <= 25) return { image: calmnessNoisy, label: '소란스러움' };
  if (index <= 50) return { image: calmnessChatty, label: '대화하는 분위기' };
  if (index <= 75) return { image: calmnessCalm, label: '잔잔한 분위기' };
  return { image: calmnessSilent, label: '고요해요' };
}

function DetailInfoSection({ place }: { place: PlaceDetail }) {
  const calmness = useMemo(() => {
    return getCalmnessInfo(place.calmnessIndex);
  }, [place.calmnessIndex]);

  return (
    <section className='border-b border-gray-200 px-5 py-8'>
      <div className='mb-[18px] flex items-center justify-between rounded-lg bg-gray-50 px-[24px] py-5'>
        <div className='flex flex-col gap-4'>
          <div className='flex items-start gap-[8px]'>
            <OutletIcon className='h-5 w-5 text-gray-800' />
            <div className='flex w-[70px] flex-col gap-1'>
              <span className='text-sm font-bold'>콘센트</span>
              <span className='text-xs'>{place.outletStatus}</span>
            </div>
          </div>
          <div className='flex items-start gap-[8px]'>
            <PeopleIcon className='h-5 w-5 text-gray-800' />
            <div className='flex w-[70px] flex-col gap-1'>
              <span className='text-sm font-bold'>혼잡도</span>
              <span className='text-xs'>{place.crowdedness}</span>
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center gap-2'>
          <img src={calmness.image} alt={calmness.label} className='h-[72px] object-contain' />
          <span className='text-body1 text-primary-700 text-center font-medium'>
            {calmness.label}
          </span>
        </div>
      </div>

      <div className='flex justify-between px-6'>
        <div className='flex items-start gap-[8px]'>
          <RestroomIcon className='h-5 w-5 text-gray-800' />
          <div className='flex w-[70px] flex-col gap-1'>
            <span className='text-sm font-bold'>화장실 정보</span>
            <span className='text-xs'>{place.restroomInfo}</span>
          </div>
        </div>
        <div className='flex items-start gap-[8px]'>
          <BuildingIcon className='h-5 w-5 text-gray-800' />
          <div className='flex w-[70px] flex-col gap-1'>
            <span className='text-sm font-bold'>층수 정보</span>
            <span className='text-xs'>{place.floorInfo}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapSection({ place }: { place: PlaceDetail }) {
  return (
    <section className='px-5 py-8'>
      <h2 className='text-heading3 mb-5 font-bold'>작업공간 지도</h2>
      <PlaceLocationMap locationPoint={place.locationPoint} placeName={place.name} />
    </section>
  );
}

function ReviewTagBar({
  tag,
  index,
  maxPercentage,
}: {
  tag: ReviewTag;
  index: number;
  maxPercentage: number;
}) {
  const colors = [
    'bg-primary-700',
    'bg-primary-600',
    'bg-primary-500',
    'bg-primary-400',
    'bg-primary-400',
  ];

  return (
    <div className='h-8 w-full rounded-lg bg-gray-300'>
      <div
        className={`flex h-8 items-center rounded-lg px-3 ${colors[index] || colors[4]}`}
        style={{ width: `${(tag.percentage / maxPercentage) * 100}%` }}
      >
        <span className='text-sm font-medium whitespace-nowrap text-gray-50'>{tag.label}</span>
      </div>
    </div>
  );
}

// 바 5개 + gap 포함: (32px * 5) + (gap 4px * 5) = 180px, gap 영역에서 잘려 경계선 방지
const COLLAPSED_TAG_HEIGHT = 180;

function ReviewSection({ place }: { place: PlaceDetail }) {
  const navigate = useNavigate();
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);
  const maxPercentage = Math.max(...place.reviewTags.map((t) => t.percentage));
  const hasMoreTags = place.reviewTags.length > 5;

  return (
    <section className='px-5 py-8'>
      <div className='mb-7 flex items-center justify-between'>
        <h2 className='text-heading3 font-bold'>사용자 리뷰</h2>
        <button
          onClick={() => navigate(`/review-creation/${place.id}`)}
          className='bg-primary-700 rounded-full px-4 py-2 text-sm font-bold text-gray-50'
        >
          리뷰 작성하기
        </button>
      </div>

      <div className='mb-8'>
        <div
          className='relative overflow-hidden transition-[max-height] duration-300'
          style={{ maxHeight: isTagsExpanded ? '600px' : `${COLLAPSED_TAG_HEIGHT}px` }}
        >
          <div className='flex flex-col gap-1'>
            {place.reviewTags.map((tag, index) => (
              <ReviewTagBar key={tag.label} tag={tag} index={index} maxPercentage={maxPercentage} />
            ))}
          </div>

          {hasMoreTags && !isTagsExpanded && (
            <div
              className='pointer-events-none absolute right-0 bottom-0 left-0 h-[84px]'
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%)',
              }}
            />
          )}
        </div>

        {hasMoreTags && (
          <button
            type='button'
            onClick={() => setIsTagsExpanded((prev) => !prev)}
            className='mt-2 flex w-full items-center justify-center'
          >
            <ChevronDownIcon
              className={`h-6 w-6 text-gray-600 transition-transform duration-300 ${isTagsExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        )}
      </div>

      <div>
        <div className='mb-5 flex h-6 items-center justify-between'>
          <div className='flex items-center gap-0.5'>
            <StarIcon className='text-primary-700 h-6 w-6' />
            <span className='text-lg font-medium'>{place.rating}</span>
          </div>
          <button
            onClick={() => navigate(`/place/${place.id}/reviews`)}
            className='flex items-center gap-1 text-gray-700'
          >
            <span>리뷰 전체보기 ({place.reviewCount})</span>
            <ChevronRightIcon className='h-6 w-6 text-gray-700' />
          </button>
        </div>

        <div className='flex flex-col gap-5'>
          {place.reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlaceDetailContent({ id }: { id: string }) {
  const navigate = useNavigate();
  const { data: place } = usePlaceDetailQuery(id);

  return (
    <div className='min-h-screen bg-white'>
      <NavigationBar
        onBack={() => navigate(-1)}
        right={
          <div className='flex gap-[16px]'>
            <button>
              <ShareIcon className='h-[24px] w-[24px] text-gray-950' />
            </button>
            <button>
              <HeartIcon className='h-[24px] w-[24px] text-gray-950' />
            </button>
          </div>
        }
      />
      <BasicInfoSection place={place} />
      <DetailInfoSection place={place} />
      <MapSection place={place} />
      <ReviewSection place={place} />
    </div>
  );
}

function PlaceDetailPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <PlaceNotFoundPage />;
  }

  return (
    <PlaceErrorBoundary>
      <Suspense
        fallback={
          <div className='flex min-h-screen items-center justify-center'>
            <span>로딩 중...</span>
          </div>
        }
      >
        <PlaceDetailContent id={id} />
      </Suspense>
    </PlaceErrorBoundary>
  );
}

export default PlaceDetailPage;
