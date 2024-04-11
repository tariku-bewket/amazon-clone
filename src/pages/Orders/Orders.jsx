import React, { useContext, useEffect, useState } from 'react';
import classes from './orders.module.css';
import Layout from '../../components/Layout/Layout';
import { db } from '../../utility/firebase';
import { DataContext } from '../../components/DataProvider/DataProvider';
import ProductCard from '../../components/Product/ProductCard';

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  // console.log(user);

  useEffect(() => {
    if (user) {
      db.collection('users')
        .doc(user.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot(
          (snapshot) => {
            // console.log(snapshot);
            setOrders(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            );
          },
          (error) => {
            console.error('Error fetching orders:', error);
          }
        );
    } else {
      setOrders([]);
    }
  }, []);

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>Your Orders</h2>
          {/* ordered items */}
          {orders?.length == 0 && (
            <div style={{ padding: '20px' }}>
              You don't have any orders yet.
            </div>
          )}
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID: {eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((order) => {
                    return (
                      <ProductCard flex={true} product={order} key={order.id} />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Orders;
