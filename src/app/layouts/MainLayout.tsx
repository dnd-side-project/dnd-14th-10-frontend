import { Suspense } from 'react';

import { Outlet } from 'react-router-dom';

import Loading from '@/shared/ui/loading/loading';

function MainLayout() {
  return (
    <div className='mx-auto max-w-[var(--width-app)]'>
      <main>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

export default MainLayout;
