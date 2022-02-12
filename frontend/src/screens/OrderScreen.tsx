import { FC, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import styles from '../styles/OrderScreen.module.scss';
import { AppDispatch } from '../store';
import { ReduxState } from '../types';
import { getOrderDetails } from '../actions/orderActions';

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

  const orderDetails = useSelector((state: ReduxState) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

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

            <div className={styles.placeOrderBtnWrapper}>
              {/* <button
                className={
                  order.orderItems.length !== 0
                    ? styles.placeOrderBtnEnabled
                    : styles.placeOrderBtnDisabled
                }
                disabled={order.orderItems.length === 0}
                // onClick={placeOrderHandler}
              >
                PLACE ORDER
              </button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default OrderScreen;
