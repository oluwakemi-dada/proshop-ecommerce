import { FC, useState, useEffect, FormEvent } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/RegisterLoginScreen.module.scss';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { AppDispatch } from '../store';
import { ReduxState } from '../types';
import { register } from '../actions/userActions';

const RegisterScreen: FC<RouteComponentProps> = ({ location, history }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [message, setMessage] = useState<string>(null!);

  const dispatch = useDispatch<AppDispatch>();

  const userRegister = useSelector((state: ReduxState) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, redirect, history]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>SIGN UP</h1>
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
          Register
        </button>
      </form>
      <div className={styles.signInText}>
        Have an Account?{' '}
        <span className={styles.signInLink}>
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </span>
      </div>
    </FormContainer>
  );
};

export default RegisterScreen;
