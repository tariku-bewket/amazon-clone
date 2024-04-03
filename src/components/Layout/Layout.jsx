import React from 'react';
import Header from '../Header/Header';
import LowerHeader from '../Header/LowerHeader';

function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default Layout;
