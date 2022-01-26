import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Product from '../components/Product';
import Loader from '../components/Loader';
import styles from '../styles/HomeScreen.module.scss';
import { ReduxState } from '../types/index';
import { AppDispatch } from '../store';
import { listProducts } from '../actions/productActions';

const HomeScreen: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  
  const productList = useSelector(
    (state: ReduxState) => state.productList
  );

  const { loading, error, products } = productList;

  const showError = () => {
    toast.error(error);
  };

  return (
    <>
      <ToastContainer />
      <h1>LATEST PRODUCTS</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        showError()
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
