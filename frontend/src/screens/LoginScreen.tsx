import { FC, useState, useEffect, FormEvent } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/LoginScreen.module.scss';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { AppDispatch } from '../store';
import { ReduxState } from '../types';
import { login } from '../actions/userActions';

const LoginScreen: FC<RouteComponentProps> = ({ location, history }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useDispatch<AppDispatch>();

  const userLogin = useSelector((state: ReduxState) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, redirect, history]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>SIGN IN</h1>
      {error && <Message msg={error} variant='danger' />}
      {loading && <Loader />}
      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor='email'>Email Address</label>
          <input
            type='text'
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter Email'
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter Password'
          />
        </div>
        <button type='submit' className={styles.submitBtn}>
          SIGN IN
        </button>
      </form>
      <div className={styles.registerText}>
        New Customer?{' '}
        <span className={styles.registerLink}>
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </span>
      </div>
    </FormContainer>
  );
};

export default LoginScreen;
