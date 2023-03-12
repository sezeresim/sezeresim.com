import { FC } from 'react';
import Footer from './Footer';
import Header from './Header';

type ILayoutProps = {
  children: React.ReactNode;
};

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <div className='bg-white dark:bg-gray-900'>
      <Header />
      <main className='layout'>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
