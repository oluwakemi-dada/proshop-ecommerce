import { FC, useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/PlaceOrderScreen.module.scss';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import { AppDispatch } from '../store';
import { ReduxState } from '../types';
// import { savePaymentMethod } from '../actions/cartActions';

const PlaceOrderScreen: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const cart = useSelector((state: ReduxState) => state.cart);

  // CALCULATE PRICES

  const addDecimals = (num: number) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const itemsPrice = Number(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100);
  const taxPrice = addDecimals(Number(0.15 * itemsPrice));
  const totalPrice = (
    Number(itemsPrice) +
    Number(taxPrice) +
    Number(shippingPrice)
  ).toFixed(2);

  const placeOrderHandler = () => {
    console.log('ORDER');
  };

  return (
    <div className={styles.wrapper}>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className={styles.summaryContainer}>
        <div className={styles.shippingPaymentOrderSummary}>
          <div className={styles.shipping}>
            <h2>SHIPPING</h2>
            <div>
              <div>Address:</div>
              <div>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}.
              </div>
            </div>
          </div>
          <div className={styles.paymentMethod}>
            <h2>PAYMENT METHOD</h2>
            <div>
              <div>Method:</div>
              <div>{cart.paymentMethod}</div>
            </div>
          </div>
          <div className={styles.orderItems}>
            <h2>ORDER ITEMS</h2>
            <div className={styles.itemsWrapper}>
              {cart.cartItems.length === 0 ? (
                <Message msg='Your cart is empty' variant='default' />
              ) : (
                cart.cartItems.map((item, index) => (
                  <div key={index} className={styles.orderItem}>
                    <img
                      src={item.image}
                      className={styles.orderImage}
                      alt={item.name}
                    />
                    <Link to={`/product/${item.product}`}>
                      <div className={styles.orderLink}>{item.name}</div>
                    </Link>
                    <div>{`${item.qty} x $${item.price} = $${(
                      item.qty * item.price
                    ).toFixed(2)}`}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className={styles.orderSummary}>
          <h2>ORDER SUMMARY</h2>
          <div className={styles.priceSummary}>
            <div>Items:</div>
            <div>${addDecimals(itemsPrice)}</div>
          </div>
          <div className={styles.priceSummary}>
            <div>Shipping:</div>
            <div>${shippingPrice}</div>
          </div>
          <div className={styles.priceSummary}>
            <div>Tax:</div>
            <div>${taxPrice}</div>
          </div>
          <div className={styles.priceSummary}>
            <div>Total:</div>
            <div>${totalPrice}</div>
          </div>
          <div className={styles.placeOrderBtnWrapper}>
            <button
              className={
                cart.cartItems.length !== 0
                  ? styles.placeOrderBtnEnabled
                  : styles.placeOrderBtnDisabled
              }
              disabled={cart.cartItems.length === 0}
              onClick={placeOrderHandler}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
