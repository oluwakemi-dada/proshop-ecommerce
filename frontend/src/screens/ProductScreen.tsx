import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import styles from '../styles/ProductScreen.module.scss';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import { ProductDetailsState } from '../types';
import { listProductDetails } from '../actions/productActions';

const ProductScreen = ({ match }: RouteComponentProps<{ id?: string }>) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProductDetails(match.params.id!));
  }, [match, dispatch]);

  const productDetails = useSelector(
    (state: ProductDetailsState) => state.productDetails
  );

  const { loading, error, product } = productDetails;

  const showError = () => {
    toast.error(error);
  };

  return (
    <>
      <ToastContainer />
      <Link to='/'>
        <div className={styles.back}>GO BACK</div>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        showError()
      ) : (
        <div className={styles.contents}>
          <img src={product?.image} alt={product.name} />

          <div>
            <h2 className={styles.productName}>
              {product.name && product.name.toUpperCase()}
            </h2>
            <div className={styles.rating}>
              <Rating
                value={product.rating}
                text={`${product.numReviews} ${
                  product.numReviews === 1 ? ' review' : ' reviews'
                }`}
              />
            </div>
            <div className={styles.priceTag}>
              <span>Price:</span>{' '}
              <span className={styles.amount}>${product.price}</span>
            </div>
            <div className={styles.description}>
              <span className={styles.descriptionTag}>Description: </span>
              <span>{product.description}</span>
            </div>
          </div>

          <div className={styles.cartArea}>
            <div className={styles.cartPrice}>
              <div>Price:</div>
              <div>${product.price}</div>
            </div>
            <div className={styles.stockStatus}>
              <div>Status:</div>
              <div>{product.countInStock ? 'In Stock' : 'Out of Stock'}</div>
            </div>
            <div className={styles.itemQty}>
              <div>Qty:</div>
              <select name='qty' id='qty'>
                <option value='1'>1</option>
              </select>
            </div>
            <div className={styles.addToCart}>
              <button
                className={
                  product.countInStock !== 0
                    ? styles.addToCartBtn
                    : styles.addBtnDisabled
                }
                disabled={product.countInStock === 0}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
