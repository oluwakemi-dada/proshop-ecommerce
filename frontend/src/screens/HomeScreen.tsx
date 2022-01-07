import { FC } from 'react';
import products from '../products';
import Product from '../components/Product';
import styles from '../styles/HomeScreen.module.scss';


const HomeScreen: FC = () => {
  return (
    <>
      <h1>LATEST PRODUCTS</h1>
      <div className={styles.productContainer}>
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default HomeScreen;
