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
 

  return (
    <div className={styles.wrapper}>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className={styles.summaryContainer}>
        <div className={styles.shippingPaymentOrderSummary}>
          <div className={styles.shipping}>
            <h2>SHIPPING</h2>
            <div>
              <div>Shipping:</div>
              <div> Futa, south gate., Akure 12345, Nigeria</div>
            </div>
          </div>
          <div className={styles.paymentMethod}>
            <h2>PAYMENT METHOD</h2>
            <div>
              <div>Method:</div>
              <div> PayPal</div>
            </div>
          </div>
          <div className={styles.orderItems}>
            <h2>ORDER ITEMS</h2>
            <div className={styles.itemsWrapper}>
              {[1, 2, 3].map((item) => (
                <div key={item} className={styles.orderItem}>
                  <img
                    src='/images/airpods.jpg'
                    className={styles.orderImage}
                    alt=''
                  />
                  <Link to={'!#'}>
                    <div className={styles.orderLink}>
                      Airpods Wireless Bluetooth Headphones
                    </div>
                  </Link>
                  <div>{`${2} X $${49.99} = $${99.98}`}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.orderSummary}>
          <h2>ORDER SUMMARY</h2>
          <div className={styles.priceSummary}>
            <div>Items:</div>
            <div>$99.98</div>
          </div>
          <div className={styles.priceSummary}>
            <div>Shipping:</div>
            <div>$99.98</div>
          </div>
          <div className={styles.priceSummary}>
            <div>Tax:</div>
            <div>$99.98</div>
          </div>
          <div className={styles.priceSummary}>
            <div>Total:</div>
            <div>$99.98</div>
          </div>
          <div className={styles.placeOrderBtnWrapper}>
            <button>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
