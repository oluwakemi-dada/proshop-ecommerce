import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/CheckoutSteps.module.scss';

interface CheckoutStepsProps {
  step1?: any;
  step2?: any;
  step3?: any;
  step4?: any;
}

const CheckoutSteps: FC<CheckoutStepsProps> = ({
  step1,
  step2,
  step3,
  step4,
}) => {
  return (
    <div className={styles.stepsWrapper}>
      <ul className={styles.container}>
        <li>
          {step1 ? (
            <Link to='/login'>
              <div className={styles.activeLink}>Sign In</div>
            </Link>
          ) : (
            <div className={styles.inactiveLink}>Sign In</div>
          )}
        </li>
        <li>
          {step2 ? (
            <Link to='/shipping'>
              <div className={styles.activeLink}>Shipping</div>
            </Link>
          ) : (
            <div className={styles.inactiveLink}>Shipping</div>
          )}
        </li>
        <li>
          {step3 ? (
            <Link to='/payment'>
              <div className={styles.activeLink}>Payment</div>
            </Link>
          ) : (
            <div className={styles.inactiveLink}>Payment</div>
          )}
        </li>
        <li>
          {step4 ? (
            <Link to='/placeorder'>
              <div className={styles.activeLink}>Place Order</div>
            </Link>
          ) : (
            <div className={styles.inactiveLink}>Place Order</div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default CheckoutSteps;
