import React from 'react';

type Props = {
  children?: React.ReactNode;
};

const PageTitle = ({ children }: Props) => {
  return (
    <div className='pb-8 pt-6 space-y-2 md:space-y-5 border-b'>
      <h1 className='font-extrabold leading-9 text-3xl text-gray-900 tracking-tight sm:leading-10 sm:text-4xl md:leading-14 md:text-6xl dark:text-gray-100'>
        {children}
      </h1>
    </div>
  );
};

export default PageTitle;
