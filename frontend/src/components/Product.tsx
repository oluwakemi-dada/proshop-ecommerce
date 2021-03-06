import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Product.module.scss';
import Rating from './Rating';
import { Product as ProductType } from '../types/index';

interface ProductProps {
  product: ProductType;
}

const Product: FC<ProductProps> = ({ product }) => {
  return (
    <div className={styles.card}>
      <Link to={`/product/${product._id}`}>
        <div className={styles.imageContainer}>
          <img src={product.image} alt='' />
        </div>
      </Link>
      <div className={styles.productDetails}>
        <Link to={`/product/${product._id}`}>
          <div className={styles.productName}>{product.name}</div>
        </Link>

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
