import { createBrowserRouter } from 'react-router-dom';

import HomePage from '@/pages/home/ui/home-page';
import LoginPage from '@/pages/login/ui/login-page';
import MapPage from '@/pages/map/ui/map-page';
import MyPage from '@/pages/my/ui/my-page';
import RegistrationPage from '@/pages/registration/ui/registration-page';
import ReviewCreationPage from '@/pages/review-creation/ui/review-creation-page';
import SpaceDetailPage from '@/pages/space-detail/ui/space-detail-page';

import MainLayout from '../layouts/MainLayout';

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
        path: '/my',
        element: <MyPage />,
      },
      {
        path: '/registration',
        element: <RegistrationPage />,
      },
      {
        path: '/space/:id',
        element: <SpaceDetailPage />,
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
]);
