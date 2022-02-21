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
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions';
import { removeFromCart } from '../actions/cartActions';
import { OrderDeliverActionTypes } from '../types';

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
  history,
}: OrderScreenProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const orderId = id;

  const [sdkReady, setSdkReady] = useState<boolean>(false);

  // SELECTORS
  const { userInfo } = useSelector((state: ReduxState) => state.userLogin);

  const orderDetails = useSelector((state: ReduxState) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state: ReduxState) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state: ReduxState) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

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
    if (successPay || successDeliver || !order || order._id !== orderId) {
      dispatch({
        type: OrderPayActionTypes.ORDER_PAY_RESET,
      });

      dispatch({
        type: OrderDeliverActionTypes.ORDER_DELIVER_RESET,
      });

      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPayScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, order, successPay, successDeliver, userInfo, history]);

  // REMOVE PAID ITEMS FROM CART
  const removePaidItemsFromCart = () => {
    orderDetails.order?.orderItems.forEach((item) => {
      dispatch(removeFromCart(item.product));
    });
  };

  // PAYMENT SUCCESS
  const successPaymentHandler = (paymentResult: any) => {
    dispatch(payOrder(orderId, paymentResult));

    // Remove item from cart
    removePaidItemsFromCart();
  };

  // DELIVERY MODE SUCCESS
  const deliverHandler = () => {
    dispatch(deliverOrder(orderId));
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

            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <div className={styles.deliveredBtnWrapper}>
                  {loadingDeliver && <Loader />}
                  <div className={styles.btnDeliver} onClick={deliverHandler}>
                    MARK AS DELIVERED
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
};

export default OrderScreen;
