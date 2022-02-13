import { FC, useState, useEffect, FormEvent } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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

      <div>
        <h2>MY ORDERS</h2>
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
            </div>
            <div className={styles.orderLists}>
              {[1, 2, 3, 4, 5].map((item, index) => (
                <div key={index}>
                  <div>Item1</div>
                  <div>Item2</div>
                  <div>Item3</div>
                  <div>Item4</div>
                  <div>Item5</div>
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
