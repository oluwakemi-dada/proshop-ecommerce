import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Pagination from '../components/Pagination';
import styles from '../styles/HomeScreen.module.scss';
import { ReduxState } from '../types/index';
import { AppDispatch } from '../store';
import { listProducts } from '../actions/productActions';

interface MatchParams {
  keyword: string;
  pageNumber: string;
}
interface HomeScreenProps extends RouteComponentProps<MatchParams> {}

const HomeScreen: FC<HomeScreenProps> = ({
  match: {
    params: { keyword, pageNumber: pageNum },
  },
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const pageNumber = pageNum || '1';

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const productList = useSelector((state: ReduxState) => state.productList);

  const { loading, error, products, page, pages } = productList;

  return (
    <>
      <h1>LATEST PRODUCTS</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message msg={error} variant='danger' />
      ) : (
        <>
          <div className={styles.productContainer}>
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
          {pages && page && (
            <Pagination
              page={page}
              pages={pages}
              keyword={keyword ? keyword : ''}
            />
          )}
        </>
      )}
    </>
  );
};

export default HomeScreen;
