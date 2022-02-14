import { FC, useState, useEffect, FormEvent } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import styles from '../styles/ProfileScreen.module.scss';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { AppDispatch } from '../store';
import { ReduxState } from '../types';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { UserUpdateProfileActionTypes } from '../types/index';

const ProfileScreen: FC<RouteComponentProps> = ({ history }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [message, setMessage] = useState<string>(null!);

  const dispatch = useDispatch<AppDispatch>();

  // SELECTORS
  const userDetails = useSelector((state: ReduxState) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state: ReduxState) => state.userLogin);
  const { userInfo } = userLogin;

  const orderListMy = useSelector((state: ReduxState) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  const userUpdateProfile = useSelector(
    (state: ReduxState) => state.userUpdateProfile
  );
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name || success) {
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
        dispatch({
          type: UserUpdateProfileActionTypes.USER_UPDATE_PROFILE_RESET,
        });
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, user, history, success]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(
        updateUserProfile({
          _id: user!._id,
          name,
          email,
          isAdmin: user!.isAdmin,
          password,
        })
      );
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h2>USER PROFILE</h2>
        {message && <Message msg={message} variant='danger' />}
        {error && <Message msg={error} variant='danger' />}
        {success && <Message msg={'Profile Updated'} variant='default' />}
        {loading && <Loader />}

        <form onSubmit={submitHandler} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter Name'
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor='email'>Email Address</label>
            <input
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter Email'
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter Password'
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm password'
            />
          </div>
          <button type='submit' className={styles.submitBtn}>
            Update
          </button>
        </form>
      </div>

      <div className={styles.ordersWrapper}>
        <h2 className={styles.ordersHeading}>MY ORDERS</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message msg={errorOrders} variant='danger' />
        ) : (
          <div>
            <div className={styles.tableHead}>
              <div>ID</div>
              <div>DATE</div>
              <div>TOTAL</div>
              <div>PAID</div>
              <div>DELIVERED</div>
              <div></div>
            </div>
            <div>
              {orders.map((order) => (
                <div key={order._id} className={styles.orderItem}>
                  <div>{order._id}</div>
                  <div>{order.createdAt.substring(0, 10)}</div>
                  <div>${order.totalPrice}</div>
                  <div>
                    {order.isPaid ? (
                      order.paidAt!.substring(0, 10)
                    ) : (
                      <FaTimes className={styles.timesIcon} />
                    )}
                  </div>
                  <div>
                    {order.isDelivered ? (
                      order.deliveredAt!.substring(0, 10)
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
    </div>
  );
};

export default ProfileScreen;
