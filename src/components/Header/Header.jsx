import React, { useContext } from 'react';
import classes from './header.module.css';
import { Link } from 'react-router-dom';

import { GrLocation } from 'react-icons/gr';
import { IoIosSearch } from 'react-icons/io';
import { BiCart } from 'react-icons/bi';
import { DataContext } from '../DataProvider/DataProvider';
import LowerHeader from './LowerHeader';
import { auth } from '../../utility/firebase';

function Header() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  return (
    <header className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          <div className={classes.logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>

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

            <IoIosSearch size={38} />
          </div>

          {/* right side link */}

          <div className={classes.order_container}>
            <Link to="" className={classes.language}>
              <img
                src="https://uxwing.com/wp-content/themes/uxwing/download/flags-landmarks/united-states-flag-icon.png"
                alt="lang"
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>

            {/* three components */}
            <Link to={!user && '/auth'}>
              <div>
                <div>
                  {user ? (
                    <>
                      <p>Hello, {user?.email?.split('@')[0]}</p>
                      <span onClick={() => auth.signOut()}>Sign Out</span>
                    </>
                  ) : (
                    <>
                      <p>Hello, sign in</p>
                      <span>Account & Lists</span>
                    </>
                  )}
                </div>
              </div>
            </Link>

            {/* order */}
            <Link to="/orders">
              <div>
                <p>Returns</p>
                <span>& Orders</span>
              </div>
            </Link>

            {/* cart */}
            <Link to="/cart" className={classes.cart}>
              <BiCart size={30} />
              <span className={classes.order_amount}>{totalItem}</span>
              <span>Cart</span>
            </Link>
          </div>
        </div>
      </section>

      <LowerHeader />
    </header>
  );
}

export default Header;
