type Props = {
  children?: React.ReactNode;
  description?: string;
};

const PageTitle = ({ children, description }: Props) => {
  return (
    <div className='border-b border-slate-200 pt-10 pb-8 dark:border-slate-800'>
      <h1 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl'>
        {children}
      </h1>
      {description ? (
        <p className='mt-3 text-slate-600 dark:text-slate-400'>{description}</p>
      ) : null}
    </div>
  );
};

export default PageTitle;
