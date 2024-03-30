import React from 'react';
import classes from './carousel.module.css';

import { Carousel } from 'react-responsive-carousel';
import { img } from './images/data';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CarouselEffect = () => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imageItemLink, index) => {
          return <img src={imageItemLink} key={index} />;
        })}
      </Carousel>
      <div className={classes.hero_img}></div>
    </div>
  );
};

export default CarouselEffect;
