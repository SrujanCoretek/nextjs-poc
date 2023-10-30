import React, { FC } from 'react';

import Navbar from './Navbar';
import Footer from './Footer';
import Footertab from './Footertab';
import PageLoader from './Loaders/PageLoader';

const Layout: FC = ({ children }: any) => {
  return (
    <>
      <PageLoader />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <Footertab />
    </>
  );
};

// const FallBackMainContainer = styled.div`
//   position: fixed;
//   width: 100%;
//   height: 100%;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(0, 0, 0, 0.7);
//   z-index: 2;
//   cursor: default;
// `;

export default Layout;
