import React from 'react';

import Layout from '../../components/Layout/Layout';
import LowerHeader from '../../components/Header/LowerHeader';
import CarouselEffect from '../../components/Carousel/CarouselEffect';
import Category from '../../components/Category/Category';

function Landing() {
  return (
    <Layout>
      <LowerHeader />
      <CarouselEffect />
      <Category />
    </Layout>
  );
}

export default Landing;
