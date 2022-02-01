import { FC, useState, useEffect, FormEvent } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/ProfileScreen.module.scss';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { AppDispatch } from '../store';
import { ReduxState } from '../types';
import { getUserDetails } from '../actions/userActions';

const ProfileScreen: FC<RouteComponentProps> = ({ history }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [message, setMessage] = useState<string>(null!);

  const dispatch = useDispatch<AppDispatch>();

  const userDetails = useSelector((state: ReduxState) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state: ReduxState) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user) {
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, user, history]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      // DISPATCH UPDATE PROFILE
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h2>USER PROFILE</h2>
        {message && <Message msg={message} variant='danger' />}
        {error && <Message msg={error} variant='danger' />}
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
      </div>
    </div>
  );
};

export default ProfileScreen;
