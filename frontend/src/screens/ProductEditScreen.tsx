import { useState, useEffect, FormEvent } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import styles from '../styles/ProductEditScreen.module.scss';
import { AppDispatch } from '../store';
import { ReduxState } from '../types';
import { listProductDetails } from '../actions/productActions';

interface MatchParams {
  id: string;
}

interface ProductEditScreenProps extends RouteComponentProps<MatchParams> {}

const ProductEditScreen = ({ match, history }: ProductEditScreenProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const productId = match.params.id;

  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [countInStock, setCountInStock] = useState<number>(0);
  const [description, setDescription] = useState<string>('');

  // SELECTORS
  const productDetails = useSelector(
    (state: ReduxState) => state.productDetails
  );
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (!product || !product.name || product._id !== productId) {
      dispatch(listProductDetails(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [dispatch, history, product, productId]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // UPDATE PRODUCT
  };

  return (
    <>
      <Link to='/admin/productlist'>
        <div className={styles.back}>GO BACK</div>
      </Link>
      <FormContainer>
        <h1>EDIT PRODUCT</h1>
        {/* {loadingUpdate && <Loader />}
        {errorUpdate && <Message msg={errorUpdate} variant='danger' />} */}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message msg={error} variant='danger' />
        ) : (
          <form onSubmit={submitHandler} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Enter name'
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor='price'>Price </label>
              <input
                type='number'
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder='Enter price'
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor='image'>Image </label>
              <input
                type='text'
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder='Enter image url'
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor='brand'>Brand </label>
              <input
                type='text'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder='Enter brand'
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor='countInStock'>Count In Stock </label>
              <input
                type='number'
                value={countInStock}
                onChange={(e) => setCountInStock(Number(e.target.value))}
                placeholder='Enter count in stock'
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor='category'>Category </label>
              <input
                type='text'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder='Enter category'
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor='description'>Description </label>
              <input
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Enter description'
              />
            </div>

            <button type='submit' className={styles.submitBtn}>
              Update
            </button>
          </form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
