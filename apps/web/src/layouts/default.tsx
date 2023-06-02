import { FC, ReactNode } from 'react';

import LayoutHeader from './header';

const DefaultLayout: FC<{
  children?: ReactNode;
}> = ({ children }) => {
  return (
    <div className="min-h-screen w-screen">
      <LayoutHeader />
      {children}
    </div>
  );
};

export default DefaultLayout;
