import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '@/app/layouts/MainLayout';
import HomePage from '@/pages/home/ui/home-page';
import LoginPage from '@/pages/login/ui/login-page';
import MapPage from '@/pages/map/ui/map-page';

import MapRecommendedPage from '@/pages/map-recommended/ui/map-recommended-page';
import MyPage from '@/pages/my/ui/my-page';
import OnboardingPage from '@/pages/onboarding/ui/onboarding-page';
import PlaceDetailPage from '@/pages/place-detail/ui/place-detail-page';
import RegistrationPage from '@/pages/registration/ui/registration-page';
import ReviewCreationPage from '@/pages/review-creation/ui/review-creation-page';

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
]);
