import React, { useState, useContext } from 'react';
import classes from './payment.module.css';
import Layout from '../../components/Layout/Layout';
import { DataContext } from '../../components/DataProvider/DataProvider';
import ProductCard from '../../components/Product/ProductCard';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat';
import { axiosInstance } from '../../api/axios';
import { ClipLoader } from 'react-spinners';
import { db } from '../../utility/firebase';
import { useNavigate } from 'react-router-dom';
import { Type } from '../../utility/action.type';

function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [cardError, setCardError] = useState('');
  const [processing, setProcessing] = useState(false);

  const [{ user, basket }, dispatch] = useContext(DataContext);
  // console.log(user);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError('');
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      // 1. backend || functions -- > contact to the client secret
      setProcessing(true);
      const response = await axiosInstance({
        method: `POST`,
        url: `/payment/create?total=${total * 100}`,
      });
      // console.log(response.data);
      const clientSecret = response?.data?.clientSecret;

      // 2. client side (react side confirmation)
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // console.log(paymentIntent);

      // 3. after the confirmation -- > order firestore database save, clear basket

      await db
        .collection('users')
        .doc(user.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      // Empty the basket
      dispatch({
        type: Type.EMPTY_BASKET,
      });

      setProcessing(false);

      navigate('/orders', { state: { msg: 'You have placed new order' } });
    } catch (error) {
      console.log(error);

      setProcessing(false);
    }
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
                    <button type="submit">
                      {processing ? (
                        <div className={classes.loading}>
                          <ClipLoader size={15} color="blue" />
                          <p>Please Wait ...</p>
                        </div>
                      ) : (
                        'Pay Now'
                      )}
                    </button>
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
