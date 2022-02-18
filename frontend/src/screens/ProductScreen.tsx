import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from '../styles/ProductScreen.module.scss';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { ReduxState } from '../types/index';
import { AppDispatch } from '../store';
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions';
import { ProductCreateReviewActionTypes } from '../types';

interface MatchParams {
  id: string;
}

interface ProductScreenProps extends RouteComponentProps<MatchParams> {}

const ProductScreen = ({
  match: {
    params: { id },
  },
  history,
}: ProductScreenProps) => {
  const [qty, setQty] = useState<number>(1);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [id, dispatch]);

  // SELECTORS
  const productDetails = useSelector(
    (state: ReduxState) => state.productDetails
  );
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state: ReduxState) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector(
    (state: ReduxState) => state.productReviewCreate
  );
  const { error: errorProductReview, success: successProductReview } =
    productReviewCreate;

  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=${qty}`);
  };

  const productDisplay = () => {
    if (loading) {
      return <Loader />;
    } else if (error) {
      return <Message msg={error} variant='danger' />;
    } else if (product) {
      return (
        <>
          <div className={styles.contents}>
            <img src={product.image} alt={product?.name} />

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

              {product.countInStock! > 0 && (
                <div className={styles.itemQty}>
                  <div>Qty:</div>
                  <select
                    value={qty}
                    onChange={(e) => setQty(parseInt(e.target.value))}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className={styles.addToCart}>
                <button
                  onClick={addToCartHandler}
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

          <div className={styles.reviewsSection}>
            <h2>REVIEWS</h2>
            {product.reviews.length === 0 && (
              <Message msg='No Reviews' variant='default' />
            )}

            <ul>
              {product.reviews.map((review) => (
                <li key={review._id} className={styles.reviewItem}>
                  <div className={styles.reviewName}>{review.name}</div>
                  <Rating value={review.rating} />
                  <div>{review.createdAt.substring(0, 10)}</div>
                  <p>{review.comment}</p>
                </li>
              ))}
            </ul>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <Link to='/'>
        <div className={styles.back}>GO BACK</div>
      </Link>
      {productDisplay()}
    </>
  );
};

export default ProductScreen;
