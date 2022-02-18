import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import styles from '../styles/HomeScreen.module.scss';
import { ReduxState } from '../types/index';
import { AppDispatch } from '../store';
import { listProducts } from '../actions/productActions';
import { match } from 'assert';

interface MatchParams {
  keyword: string;
}
interface HomeScreenProps extends RouteComponentProps<MatchParams> {}

const HomeScreen: FC<HomeScreenProps> = ({
  match: {
    params: { keyword },
  },
}) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  const productList = useSelector((state: ReduxState) => state.productList);

  const { loading, error, products } = productList;

  return (
    <>
      <h1>LATEST PRODUCTS</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message msg={error} variant='danger' />
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
