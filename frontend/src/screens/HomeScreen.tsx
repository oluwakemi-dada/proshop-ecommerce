import axios from 'axios';
import { FC, useState, useEffect } from 'react';
import Product from '../components/Product';
import styles from '../styles/HomeScreen.module.scss';
import { ProductTypes } from '../../types';

const HomeScreen: FC = () => {
  const [products, setProducts] = useState<ProductTypes[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        setProducts(res.data);
      } catch (err) {
        console.log('Something went wrong');
      }
    };

    fetchProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className={styles.productContainer}>
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default HomeScreen;
