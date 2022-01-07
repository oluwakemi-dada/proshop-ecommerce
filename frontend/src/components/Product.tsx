import { FC } from 'react';
import styles from '../styles/Product.module.scss';
import Rating from './Rating';
import { ProductTypes } from '../../types';

const Product: FC<{ product: ProductTypes }> = ({ product }) => {
  return (
    <div className={styles.card}>
      <a href={`/product/${product._id}`}>
        <img src={product.image} alt='' />
      </a>
      <div className={styles.productDetails}>
        <a href={`/product/${product._id}`}>
          <div className={styles.productName}>{product.name}</div>
        </a>

        <Rating
          value={product.rating}
          text={`${product.numReviews} ${
            product.numReviews === 1 ? ' review' : ' reviews'
          }`}
        />

        <div className={styles.price}>${product.price}</div>
      </div>
    </div>
  );
};

export default Product;
