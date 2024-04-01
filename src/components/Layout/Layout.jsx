import React from 'react';
import Header from '../Header/Header';
import LowerHeader from '../Header/LowerHeader';

function Layout({ children }) {
  return (
    <>
      <Header />
      <LowerHeader />
      {children}
    </>
  );
}

export default Layout;
