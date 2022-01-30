import { FC } from 'react';
import styles from '../styles/FormContainer.module.scss';

const FormContainer: FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <div>{children}</div>
    </div>
  );
};

export default FormContainer;
