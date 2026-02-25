import { createBrowserRouter } from 'react-router-dom';

import ProtectedRoute from '@/app/components/ProtectedRoute';
import MainLayout from '@/app/layouts/MainLayout';
import AnnouncementListPage from '@/pages/announcement/ui/announcement-list-page';
import AnnouncementDetailPage from '@/pages/announcement-detail/ui/announcement-detail-page';
import BadgePage from '@/pages/badge/ui/badge-page';
import HomePage from '@/pages/home/ui/home-page';
import LoginPage from '@/pages/login/ui/login-page';
import MapPage from '@/pages/map/ui/map-page';
import MapRecommendedPage from '@/pages/map-recommended/ui/map-recommended-page';
import MyPage from '@/pages/my/ui/my-page';
import MyEditPage from '@/pages/my-edit/ui/my-edit-page';
import MyEditAddressPage from '@/pages/my-edit-address/ui/my-edit-address-page';
import MyEditBirthdayPage from '@/pages/my-edit-birthday/ui/my-edit-birthday-page';
import MyEditNicknamePage from '@/pages/my-edit-nickname/ui/my-edit-nickname-page';
import OAuthKakaoCallbackPage from '@/pages/oauth-kakao-callback/ui/oauth-kakao-callback-page';
import OnboardingPage from '@/pages/onboarding/ui/onboarding-page';
import PlaceDetailPage from '@/pages/place-detail/ui/place-detail-page';
import PlaceNotFoundPage from '@/pages/place-not-found/ui/place-not-found-page';
import RegisteredPlacesPage from '@/pages/registered-places/ui/registered-places-page';
import RegistrationPage from '@/pages/registration/ui/registration-page';
import ReviewCreationPage from '@/pages/review-creation/ui/review-creation-page';
import ReviewHistoryPage from '@/pages/review-history/ui/review-history-page';
import ReviewListPage from '@/pages/review-list/ui/review-list-page';
import WishlistPage from '@/pages/wishlist/ui/wishlist-page';
import WithdrawalPage from '@/pages/withdrawal/ui/withdrawal-page';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/map',
        element: <MapPage />,
      },
      {
        path: '/map/recommended',
        element: <MapRecommendedPage />,
      },
      {
        path: '/my',
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/my/edit',
        element: (
          <ProtectedRoute>
            <MyEditPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/my/edit/birthday',
        element: (
          <ProtectedRoute>
            <MyEditBirthdayPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/my/edit/address',
        element: (
          <ProtectedRoute>
            <MyEditAddressPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/my/edit/nickname',
        element: (
          <ProtectedRoute>
            <MyEditNicknamePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/registration',
        element: (
          <ProtectedRoute>
            <RegistrationPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/place/:id',
        element: <PlaceDetailPage />,
      },
      {
        path: '/review-creation/:id',
        element: (
          <ProtectedRoute>
            <ReviewCreationPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/place/:id/reviews',
        element: <ReviewListPage />,
      },
      {
        path: '/announcement',
        element: <AnnouncementListPage />,
      },
      {
        path: '/announcement/:id',
        element: <AnnouncementDetailPage />,
      },
      {
        path: '/my/registered-places',
        element: (
          <ProtectedRoute>
            <RegisteredPlacesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/my/reviews',
        element: (
          <ProtectedRoute>
            <ReviewHistoryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/my/badges',
        element: (
          <ProtectedRoute>
            <BadgePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/wishlist',
        element: <WishlistPage />,
      },
      {
        path: '/place-not-found',
        element: <PlaceNotFoundPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/onboarding',
    element: <OnboardingPage />,
  },
  {
    path: '/withdrawal',
    element: <WithdrawalPage />,
  },
  {
    path: '/oauth/kakao/callback',
    element: <OAuthKakaoCallbackPage />,
  },
]);
