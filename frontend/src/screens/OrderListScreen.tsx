import React from 'react';

import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import styles from '../styles/OrderListScreen.module.scss';
import { AppDispatch } from '../store';
import { ReduxState } from '../types';
import { FaTimes, FaCheck, FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { listOrders } from '../actions/orderActions';

const OrderListScreen: FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch<AppDispatch>();

  const orderList = useSelector((state: ReduxState) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state: ReduxState) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  return (
    <div className={styles.ordersWrapper}>
      <h1 className={styles.ordersHeading}>ORDERS</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message msg={error} variant='danger' />
      ) : (
        <div className={styles.ordersTable}>
          <div className={styles.tableHead}>
            <div>ID</div>
            <div>USER</div>
            <div>DATE</div>
            <div>TOTAL</div>
            <div>PAID</div>
            <div>DELIVERED</div>
            <div></div>
          </div>
          <div>
            {orders.map((order) => (
              <div key={order._id} className={styles.order}>
                <div>{order._id}</div>
                <div>{order.user && order.user.name}</div>
                <div>
                  <div>{order.createdAt.substring(0, 10)}</div>
                </div>
                <div>
                  <div>${order.totalPrice}</div>
                </div>
                <div>
                  {order.isPaid ? (
                    order.paidAt?.substring(0, 10)
                  ) : (
                    <FaTimes className={styles.timesIcon} />
                  )}
                </div>
                <div>
                  {order.isDelivered ? (
                    order.deliveredAt?.substring(0, 10)
                  ) : (
                    <FaTimes className={styles.timesIcon} />
                  )}
                </div>

                <Link to={`/order/${order._id}`}>
                  <div className={styles.detailsBtn}>DETAILS</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderListScreen;
