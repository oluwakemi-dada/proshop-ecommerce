import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import styles from '../styles/HomeScreen.module.scss';
import { ReduxState } from '../types';
import { listProducts } from '../actions/productActions';

const HomeScreen: FC = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state: ReduxState) => state.productList);

  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>LATEST PRODUCTS</h1>
      {loading ? (
        <h2>Loading</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <div className={styles.productContainer}>
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default HomeScreen;
