import { Suspense } from 'react';

import { Outlet } from 'react-router-dom';

import Loading from '@/shared/ui/loading/loading';

function MainLayout() {
  return (
    <div>
      <main>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

export default MainLayout;
