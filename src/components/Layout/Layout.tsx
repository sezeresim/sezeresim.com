'use client';
import Header from '@/components/Header/Header';

type ILayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className='bg-white dark:bg-slate-950 min-h-screen'>
      <Header />
      <main className='layout'>{children}</main>
    </div>
  );
};

export default Layout;
