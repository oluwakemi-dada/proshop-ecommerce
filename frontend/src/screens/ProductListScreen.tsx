import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import styles from '../styles/ProductListScreen.module.scss';
import { AppDispatch } from '../store';
import { ReduxState } from '../types';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { listProducts, deleteProduct } from '../actions/productActions';

interface MatchParams {
  id: string;
}

interface ProductListScreenProps extends RouteComponentProps<MatchParams> {}

const ProductListScreen: FC<ProductListScreenProps> = ({
  match: { params: id },
  history,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const productList = useSelector((state: ReduxState) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state: ReduxState) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const userLogin = useSelector((state: ReduxState) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id: string) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = (product: any) => {
    // create
  };

  return (
    <div className={styles.productsWrapper}>
      <div className={styles.productsHeading}>
        <h1>PRODUCTS</h1>
        <div onClick={createProductHandler} className={styles.createProductBtn}>
          <FaPlus />
          <div>CREATE PRODUCT</div>
        </div>
      </div>

      {loadingDelete && <Loader />}
      {errorDelete && <Message msg={errorDelete} variant='danger' />}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message msg={error} variant='danger' />
      ) : (
        <div className={styles.productsTable}>
          <div className={styles.tableHead}>
            <div>ID</div>
            <div>NAME</div>
            <div>PRICE</div>
            <div>CATEGORY</div>
            <div>BRAND</div>
            <div></div>
          </div>
          <div>
            {products.map((product) => (
              <div key={product._id} className={styles.user}>
                <div>{product._id}</div>
                <div>{product.name}</div>
                <div>${product.price}</div>
                <div>{product.category}</div>
                <div>{product.brand}</div>
                <div className={styles.deleteEditIcons}>
                  <Link to={`/admin/product/${product._id}/edit`}>
                    <div className={styles.editIcon}>
                      <FaEdit />
                    </div>
                  </Link>

                  <div
                    onClick={() => deleteHandler(product._id)}
                    className={styles.deleteIcon}
                  >
                    <AiFillDelete />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListScreen;
