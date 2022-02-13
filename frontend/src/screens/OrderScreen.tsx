import { useEffect, useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';
import Loader from '../components/Loader';
import Message from '../components/Message';
import styles from '../styles/OrderScreen.module.scss';
import { AppDispatch } from '../store';
import { ReduxState, OrderPayActionTypes } from '../types';
import { getOrderDetails, payOrder } from '../actions/orderActions';

declare global {
  interface Window {
    paypal: any;
  }
}

interface MatchParams {
  id: string;
}

interface OrderScreenProps extends RouteComponentProps<MatchParams> {}
const OrderScreen = ({
  match: {
    params: { id },
  },
}: OrderScreenProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const orderId = id;

  const [sdkReady, setSdkReady] = useState<boolean>(false);

  // SELECTORS
  const orderDetails = useSelector((state: ReduxState) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state: ReduxState) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  useEffect(() => {
    // PAYPAL
    const addPayPayScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    // GET ORDER DETAILS
    if (successPay || !order || order._id !== orderId) {
      dispatch({
        type: OrderPayActionTypes.ORDER_PAY_RESET,
      });
      
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPayScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, order, successPay]);

  // PAYMENT SUCCESS
  const successPaymentHandler = (paymentResult: any) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  if (loading) {
    return <Loader />;
  } else if (error || !order) {
    return <Message msg={error} variant='danger' />;
  } else {
    return (
      <div className={styles.wrapper}>
        <h1>
          ORDER: <span>{order._id}</span>
        </h1>
        <div className={styles.summaryContainer}>
          <div className={styles.shippingPaymentOrderSummary}>
            <div className={styles.shipping}>
              <h2>SHIPPING</h2>
              <div>
                <div>Name:</div>
                <div>{order.user.name}</div>
              </div>
              <div>
                <div>Email:</div>
                <a
                  href={`mailto:${order.user.email}`}
                  className={styles.mailTo}
                >
                  {order.user.email}
                </a>
              </div>
              <div>
                <div>Address:</div>
                <div>
                  {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                  {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.country}.
                </div>
              </div>
              <div className={styles.deliveryStatus}>
                {order.isDelivered ? (
                  <Message
                    msg={`Delivered on ${order.deliveredAt}`}
                    variant='success'
                  />
                ) : (
                  <Message msg='Not  Delivered' variant='danger' />
                )}
              </div>
            </div>
            <div className={styles.paymentMethod}>
              <h2>PAYMENT METHOD</h2>
              <div>
                <div>Method:</div>
                <div>{order.paymentMethod}</div>
              </div>
              <div className={styles.paymentStatus}>
                {order.isPaid ? (
                  <Message msg={`Paid on ${order.paidAt}`} variant='success' />
                ) : (
                  <Message msg='Not  Paid' variant='danger' />
                )}
              </div>
            </div>
            <div className={styles.orderItems}>
              <h2>ORDER ITEMS</h2>
              <div className={styles.itemsWrapper}>
                {order.orderItems.length === 0 ? (
                  <Message msg='Order is empty' variant='default' />
                ) : (
                  order.orderItems.map((item, index) => (
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
              <div>${order.itemsPrice}</div>
            </div>
            <div className={styles.priceSummary}>
              <div>Shipping:</div>
              <div>${order.shippingPrice}</div>
            </div>
            <div className={styles.priceSummary}>
              <div>Tax:</div>
              <div>${order.taxPrice}</div>
            </div>
            <div className={styles.priceSummary}>
              <div>Total:</div>
              <div>${order.totalPrice}</div>
            </div>

            {!order.isPaid && (
              <div className={styles.placeOrderBtnWrapper}>
                {loadingPay && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default OrderScreen;
