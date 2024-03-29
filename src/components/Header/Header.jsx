import React from 'react';
import classes from './header.module.css';

import { GrLocation } from 'react-icons/gr';
import { IoIosSearch } from 'react-icons/io';
import { BiCart } from 'react-icons/bi';

function Header() {
  return (
    <>
      <section>
        <div className={classes.header_container}>
          <div className={classes.logo_container}>
            {/* logo */}
            <a href="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </a>

            {/* Delivery Location*/}
            <div className={classes.delivery}>
              <span>
                <GrLocation size="18px" style={{ marginTop: '2px' }} />
              </span>
              <div>
                <p>Deliver to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>

            <input type="text" name="" id="" placeholder="Search Amazon" />

            <IoIosSearch size={40} />
          </div>

          {/* right side link */}

          <div className={classes.order_container}>
            <a href="" className={classes.language}>
              <img
                src="https://uxwing.com/wp-content/themes/uxwing/download/flags-landmarks/united-states-flag-icon.png"
                alt="lang"
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </a>
            {/* three components */}
            <a href="">
              <div>
                <p>Hello, sign in</p>
                <span>Account & Lists</span>
              </div>
            </a>
            {/* order */}
            <a href="">
              <div>
                <p>Returns</p>
                <span>& Orders</span>
              </div>
            </a>
            {/* cart */}
            <a href="" className={classes.cart}>
              <BiCart size={40} />
              <span className={classes.order_amount}>0</span>
              <span>Cart</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Header;
