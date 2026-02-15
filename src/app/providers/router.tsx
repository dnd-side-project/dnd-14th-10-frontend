import { createBrowserRouter } from 'react-router-dom';

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
import OnboardingPage from '@/pages/onboarding/ui/onboarding-page';
import PlaceDetailPage from '@/pages/place-detail/ui/place-detail-page';
import PlaceNotFoundPage from '@/pages/place-not-found/ui/place-not-found-page';
import RegisteredPlacesPage from '@/pages/registered-places/ui/registered-places-page';
import RegistrationPage from '@/pages/registration/ui/registration-page';
import ReviewCreationPage from '@/pages/review-creation/ui/review-creation-page';
import ReviewHistoryPage from '@/pages/review-history/ui/review-history-page';
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
        element: <MyPage />,
      },
      {
        path: '/my/edit',
        element: <MyEditPage />,
      },
      {
        path: '/my/edit/birthday',
        element: <MyEditBirthdayPage />,
      },
      {
        path: '/my/edit/address',
        element: <MyEditAddressPage />,
      },
      {
        path: '/my/edit/nickname',
        element: <MyEditNicknamePage />,
      },
      {
        path: '/registration',
        element: <RegistrationPage />,
      },
      {
        path: '/place/:id',
        element: <PlaceDetailPage />,
      },
      {
        path: '/review-creation/:id',
        element: <ReviewCreationPage />,
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
        element: <RegisteredPlacesPage />,
      },
      {
        path: '/my/reviews',
        element: <ReviewHistoryPage />,
      },
      {
        path: '/my/badges',
        element: <BadgePage />,
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
]);
