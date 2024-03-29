import React from 'react';
import classes from './header.module.css';

import { AiOutlineMenu } from 'react-icons/ai';

const LowerHeader = () => {
  return (
    <section className={classes.lower_container}>
      <ul>
        <li>
          <a href="">
            <AiOutlineMenu />
            <p>All</p>
          </a>
        </li>
        <li>
          <a href="">Today's Deals</a>
        </li>
        <li>
          <a href="">Customer Service</a>
        </li>
        <li>
          <a href="">Registry</a>
        </li>
        <li>
          <a href="">Gift Cards</a>
        </li>
        <li>
          <a href="">Sell</a>
        </li>
      </ul>
    </section>
  );
};

export default LowerHeader;
