import { FC } from 'react';
import styles from '../styles/Footer.module.scss'

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className='container'>Copyright &copy; ProShop</div>
    </footer>
  );
};

export default Footer;
