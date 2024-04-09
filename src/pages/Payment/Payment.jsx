import React, { useState, useContext } from 'react';
import classes from './payment.module.css';
import Layout from '../../components/Layout/Layout';
import { DataContext } from '../../components/DataProvider/DataProvider';
import ProductCard from '../../components/Product/ProductCard';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat';

function Payment() {
  const stripe = useStripe();
  const elements = useElements();

  const [cardError, setCardError] = useState('');
  const [{ user, basket }] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : '';
  };

  const handlePayment = (e) => {
    e.preventDefault();
  };

  return (
    <Layout>
      {/* header */}
      <div className={classes.payment__header}>
        Checkout ({totalItem}) items
      </div>

      {/* payment method */}

      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email} </div>
            <div>456 React Place</div>
            <div>Chicago, Sr</div>
          </div>
        </div>
        <hr />

        {/* product  */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => {
              return <ProductCard key={item.id} product={item} flex={true} />;
            })}
          </div>
        </div>
        <hr />

        <section>
          {/* card error  */}
          <p className={classes.card__error}>
            {cardError && <small>{cardError}</small>}
          </p>

          <div className={classes.flex}>
            <h3>Payment methods</h3>
            <div className={classes.payment__card_container}>
              <div className={classes.payment__details}>
                <form onSubmit={handlePayment}>
                  {/* card form */}
                  <CardElement onChange={handleChange} />
                  {/* price  */}
                  <div className={classes.payment__price}>
                    <div>
                      <span
                        style={{
                          display: 'flex',
                          gap: '10px',
                          alignItems: 'center',
                        }}
                      >
                        {' '}
                        <p>Total Order |</p> <CurrencyFormat amount={total} />
                      </span>
                    </div>
                    <button>Pay Now</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </section>
    </Layout>
  );
}

export default Payment;
