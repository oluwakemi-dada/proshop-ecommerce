import { FC, useState, FormEvent } from 'react';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import styles from '../styles/PaymentScreen.module.scss';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { ReduxState } from '../types';
import { savePaymentMethod } from '../actions/cartActions';

interface PaymentScreenProps extends RouteComponentProps {}

const PaymentScreen: FC<PaymentScreenProps> = ({ history }) => {
  const dispatch = useDispatch<AppDispatch>();

  const cart = useSelector((state: ReduxState) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState<string>('PayPal');

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>PAYMENT METHOD</h1>
      <form onSubmit={submitHandler} className={styles.form}>
        <h2>Select Method</h2>
        <div className={styles.formGroup}>
          <input
            type='radio'
            id='PayPal'
            name='paymentMethod'
            value='PayPal'
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor='PayPal'>Paypal </label>
        </div>

        {/* <div className={styles.formGroup}>
          <input
            type='radio'
            id='Stripe'
            name='paymentMethod'
            value='Stripe'
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor='Stripe'>Paypal </label>
        </div> */}

        <button type='submit' className={styles.submitBtn}>
          CONTINUE
        </button>
      </form>
    </FormContainer>
  );
};

export default PaymentScreen;
