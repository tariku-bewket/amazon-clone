import React, { useState } from 'react';
import CategoryCard from './CategoryCard';

import classes from './category.module.css';

function Category() {
  const [Infos, setInfos] = useState([
    {
      title: 'Electronics',
      name: 'electronics',
      imgLink:
        'https://m.media-amazon.com/images/I/71FuI8YvCNL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
    },
    {
      title: 'Discover fashion trends',
      name: "women's clothing",
      imgLink: 'https://m.media-amazon.com/images/I/61xt3tiTsEL._AC_UL320_.jpg',
    },
    {
      title: "Men's clothing",
      name: "men's clothing",
      imgLink: 'https://m.media-amazon.com/images/I/81TQnSYLadL._AC_UL320_.jpg',
    },
    {
      title: 'Jewelery',
      name: 'jewelery',
      imgLink:
        'https://m.media-amazon.com/images/I/71w9U0LAOwL._AC_UL320_T1F_.jpg',
    },
  ]);
  return (
    <section className={classes.category_container}>
      {Infos.map((infos, index) => {
        return (
          <CategoryCard
            title={infos.title}
            name={infos.name}
            imgLink={infos.imgLink}
            key={index}
          />
        );
      })}
    </section>
  );
}

export default Category;
