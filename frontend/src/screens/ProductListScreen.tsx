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
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions';
import { ProductCreateActionTypes } from '../types';

interface MatchParams {
  id: string;
}

interface ProductListScreenProps extends RouteComponentProps<MatchParams> {}

const ProductListScreen: FC<ProductListScreenProps> = ({
  match: { params: id },
  history,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  // SELECTORS
  const productList = useSelector((state: ReduxState) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state: ReduxState) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state: ReduxState) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state: ReduxState) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({
      type: ProductCreateActionTypes.PRODUCT_CREATE_RESET,
    });

    if (userInfo && !userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct!._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  // DELETE PRODUCT
  const deleteProductHandler = (id: string) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id));
    }
  };

  // CREATE PRODUCT
  const createProductHandler = () => {
    dispatch(createProduct());
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
      {loadingCreate && <Loader />}
      {errorCreate && <Message msg={errorCreate} variant='danger' />}
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
                    onClick={() => deleteProductHandler(product._id)}
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
