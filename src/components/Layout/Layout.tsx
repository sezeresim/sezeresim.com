'use client';
import Header from '@/components/Header/Header';

type ILayoutProps = { children: React.ReactNode };

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div>
      <Header />
      <main className='layout'>{children}</main>
    </div>
  );
};

export default Layout;
