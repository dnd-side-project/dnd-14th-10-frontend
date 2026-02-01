import { Button } from '@/components/ui/button';

function HomePage() {
  return (
    <div className='font-pretendard min-h-screen bg-gray-50 p-8'>
      <div className='mx-auto max-w-4xl space-y-8'>
        <header>
          <h1 className='text-heading1 font-bold tracking-tight text-gray-900'>
            디자인 시스템 테스트
          </h1>
        </header>

        <section className='space-y-4'>
          <h2 className='text-heading2 font-bold text-gray-800'>Color Palette</h2>

          <div className='space-y-2'>
            <h3 className='text-heading4 font-medium text-gray-700'>Primary</h3>
            <div className='flex gap-2'>
              <div className='bg-primary-700 size-12 rounded-md' title='primary-700' />
              <div className='bg-primary-600 size-12 rounded-md' title='primary-600' />
              <div className='bg-primary-500 size-12 rounded-md' title='primary-500' />
              <div className='bg-primary-400 size-12 rounded-md' title='primary-400' />
              <div className='bg-primary-300 size-12 rounded-md' title='primary-300' />
              <div className='bg-primary-200 size-12 rounded-md' title='primary-200' />
              <div className='bg-primary-100 size-12 rounded-md' title='primary-100' />
              <div className='bg-primary-50 size-12 rounded-md' title='primary-50' />
            </div>
          </div>

          <div className='space-y-2'>
            <h3 className='text-heading4 font-medium text-gray-700'>Secondary</h3>
            <div className='flex gap-2'>
              <div className='bg-secondary-700 size-12 rounded-md' title='secondary-700' />
              <div className='bg-secondary-600 size-12 rounded-md' title='secondary-600' />
              <div className='bg-secondary-500 size-12 rounded-md' title='secondary-500' />
              <div className='bg-secondary-400 size-12 rounded-md' title='secondary-400' />
              <div className='bg-secondary-300 size-12 rounded-md' title='secondary-300' />
              <div className='bg-secondary-200 size-12 rounded-md' title='secondary-200' />
              <div className='bg-secondary-100 size-12 rounded-md' title='secondary-100' />
              <div className='bg-secondary-50 size-12 rounded-md' title='secondary-50' />
            </div>
          </div>

          <div className='space-y-2'>
            <h3 className='text-heading4 font-medium text-gray-700'>Gray Scale</h3>
            <div className='flex gap-2'>
              <div className='size-12 rounded-md bg-gray-950' title='gray-950' />
              <div className='size-12 rounded-md bg-gray-900' title='gray-900' />
              <div className='size-12 rounded-md bg-gray-800' title='gray-800' />
              <div className='size-12 rounded-md bg-gray-700' title='gray-700' />
              <div className='size-12 rounded-md bg-gray-600' title='gray-600' />
              <div className='size-12 rounded-md bg-gray-500' title='gray-500' />
              <div className='size-12 rounded-md bg-gray-400' title='gray-400' />
              <div className='size-12 rounded-md bg-gray-300' title='gray-300' />
              <div className='size-12 rounded-md bg-gray-200' title='gray-200' />
              <div className='bg-gray-150 size-12 rounded-md' title='gray-150' />
              <div className='size-12 rounded-md bg-gray-100' title='gray-100' />
              <div
                className='size-12 rounded-md border border-gray-200 bg-gray-50'
                title='gray-50'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <h3 className='text-heading4 font-medium text-gray-700'>Semantic - Positive</h3>
            <div className='flex gap-2'>
              <div className='bg-positive-default size-12 rounded-md' title='positive-default' />
              <div className='bg-positive-light size-12 rounded-md' title='positive-light' />
              <div className='bg-positive-disabled size-12 rounded-md' title='positive-disabled' />
            </div>
          </div>

          <div className='space-y-2'>
            <h3 className='text-heading4 font-medium text-gray-700'>Semantic - Warning</h3>
            <div className='flex gap-2'>
              <div className='bg-warning-default size-12 rounded-md' title='warning-default' />
              <div className='bg-warning-light size-12 rounded-md' title='warning-light' />
              <div className='bg-warning-disabled size-12 rounded-md' title='warning-disabled' />
            </div>
          </div>
        </section>

        <section className='space-y-4'>
          <h2 className='text-heading2 font-bold text-gray-800'>Typography</h2>
          <div className='space-y-3 rounded-lg border border-gray-200 bg-white p-6'>
            <p className='text-heading1 font-bold'>Heading 1 - 32px Bold</p>
            <p className='text-heading2 font-bold'>Heading 2 - 24px Bold</p>
            <p className='text-heading3 font-bold'>Heading 3 - 22px Bold</p>
            <p className='text-heading4 font-bold'>Heading 4 - 18px Bold</p>
            <p className='text-body1'>Body 1 - 16px Regular</p>
            <p className='text-body2'>Body 2 - 14px Regular</p>
            <p className='text-caption1 text-gray-500'>Caption 1 - 13px</p>
            <p className='text-caption2 text-gray-500'>Caption 2 - 12px</p>
            <p className='text-caption3 text-gray-500'>Caption 3 - 10px</p>
          </div>
        </section>

        <section className='space-y-4'>
          <h2 className='text-heading2 font-bold text-gray-800'>Spacing & Radius</h2>
          <div className='flex flex-wrap gap-4'>
            <div className='bg-primary-100 rounded-xs p-4'>
              <span className='text-body2'>rounded-xs (2px)</span>
            </div>
            <div className='bg-primary-200 rounded-sm p-4'>
              <span className='text-body2'>rounded-sm (4px)</span>
            </div>
            <div className='bg-primary-300 rounded-md p-4'>
              <span className='text-body2'>rounded-md (8px)</span>
            </div>
            <div className='bg-primary-400 rounded-lg p-4'>
              <span className='text-body2'>rounded-lg (12px)</span>
            </div>
            <div className='bg-primary-500 rounded-xl p-4'>
              <span className='text-body2 text-white'>rounded-xl (16px)</span>
            </div>
            <div className='bg-primary-600 rounded-2xl p-4'>
              <span className='text-body2 text-white'>rounded-2xl (24px)</span>
            </div>
          </div>
        </section>

        <section className='space-y-4'>
          <h2 className='text-heading2 font-bold text-gray-800'>Button Examples (shadcn)</h2>
          <div className='flex flex-wrap gap-3'>
            <Button>Primary Button</Button>
            <Button variant='secondary'>Secondary Button</Button>
            <Button variant='outline'>Outline Button</Button>
            <Button variant='destructive'>Destructive Button</Button>
            <Button variant='ghost'>Ghost Button</Button>
            <Button variant='link'>Link Button</Button>
          </div>
          <div className='flex flex-wrap items-center gap-3'>
            <Button size='lg'>Large</Button>
            <Button size='default'>Default</Button>
            <Button size='sm'>Small</Button>
            <Button size='xs'>Extra Small</Button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
