import { FC, useState, FormEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/ShippingScreen.module.scss';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { AppDispatch } from '../store';
import { ReduxState } from '../types';
import { saveShippingAddress } from '../actions/cartActions';

interface ShippingScreenProps extends RouteComponentProps {}

const ShippingScreen: FC<ShippingScreenProps> = ({ history }) => {
  const dispatch = useDispatch<AppDispatch>();

  const cart = useSelector((state: ReduxState) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState<string>(
    shippingAddress.address ? shippingAddress.address : ''
  );
  const [city, setCity] = useState<string>(
    shippingAddress.city ? shippingAddress.city : ''
  );
  const [postalCode, setPostalCode] = useState<string>(
    shippingAddress.postalCode ? shippingAddress.postalCode : ''
  );
  const [country, setCountry] = useState<string>(
    shippingAddress.country ? shippingAddress.country : ''
  );

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>SHIPPING</h1>
      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor='address'>Address</label>
          <input
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder='Enter address'
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor='city'>City</label>
          <input
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder='Enter city'
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor='postalCode'>Postal Code</label>
          <input
            type='text'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder='Enter postal code'
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor='country'>Country</label>
          <input
            type='text'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder='Enter country'
            required
          />
        </div>
        <button type='submit' className={styles.submitBtn}>
          CONTINUE
        </button>
      </form>
    </FormContainer>
  );
};

export default ShippingScreen;
