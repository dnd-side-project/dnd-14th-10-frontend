import { createBrowserRouter } from 'react-router-dom';

import DesignSystemPage from '@/pages/design-system/ui/design-system-page';
import HomePage from '@/pages/home/ui/home-page';
import LoginPage from '@/pages/login/ui/login-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/design-system',
    element: <DesignSystemPage />,
  },
]);
