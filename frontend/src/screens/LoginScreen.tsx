import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/LoginScreen.module.scss';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { AppDispatch } from '../store';
import { ReduxState } from '../types';
import { login } from '../actions/userActions';

const LoginScreen: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const submitHandler = () => {};

  return (
    <FormContainer>
      <h1>SIGN IN</h1>
      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor='email'>Email Address</label>
          <input type='text' placeholder='Enter Email' />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor='password'>Password</label>
          <input type='password' placeholder='Enter Password' />
        </div>
        <button type='submit' className={styles.submitBtn}>
          SIGN IN
        </button>
      </form>
      <div className={styles.registerText}>
        New Customer?{' '}
        <span className={styles.registerLink}>
          <Link to='/register'>Register</Link>
        </span>
      </div>
    </FormContainer>
  );
};

export default LoginScreen;
