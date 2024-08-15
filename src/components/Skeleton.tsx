const Skeleton = () => {
  return (
    <div
      role='status'
      className='col-span-2 grid w-full animate-pulse grid-cols-2 items-center gap-10 border-b border-solid border-gray-200 pb-3 last:border-none rtl:space-x-reverse'
    >
      <div className='flex h-48 w-full max-w-[364px] items-center justify-center rounded-xl bg-gray-300 object-cover dark:bg-gray-700 sm:w-96'>
        <svg
          className='h-10 w-10 text-gray-200 dark:text-gray-600'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          viewBox='0 0 20 18'
        >
          <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
        </svg>
      </div>
      <div className='flex w-full flex-col gap-5'>
        <div className='flex flex-col gap-4'>
          <div className='h-2.5 w-12 rounded-full bg-gray-200 dark:bg-gray-700'></div>
          <div className='flex flex-wrap gap-3'>
            <div className='h-5 w-14 rounded-full bg-gray-200 dark:bg-gray-700'></div>
            <div className='h-5 w-14 rounded-full bg-gray-200 dark:bg-gray-700'></div>
            <div className='h-5 w-14 rounded-full bg-gray-200 dark:bg-gray-700'></div>
          </div>
          <div className='h-2.5 w-44 rounded-full bg-gray-200 dark:bg-gray-700'></div>
        </div>
        <div>
          <div className='h-2.5 rounded-full bg-gray-200 dark:bg-gray-700'></div>
          <div className='mt-3 h-2.5 rounded-full bg-gray-200 dark:bg-gray-700'></div>
          <div className='mt-3 h-2.5 rounded-full bg-gray-200 dark:bg-gray-700'></div>
          <div className='mt-3 h-2.5 rounded-full bg-gray-200 dark:bg-gray-700'></div>
        </div>
      </div>
      <span className='sr-only'>Loading...</span>
    </div>
  );
};

export default Skeleton;
