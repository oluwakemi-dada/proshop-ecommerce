import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import styles from '../styles/CartScreen.module.scss';
import Message from '../components/Message';
import { ReduxState } from '../types/index';
import { AppDispatch } from '../store';
import { addToCart, removeFromCart } from '../actions/cartActions';

interface MatchParams {
  id: string;
}

interface CartScreenProps extends RouteComponentProps<MatchParams> {}

const CartScreen = ({
  match: {
    params: { id },
  },
  location,
  history,
}: CartScreenProps) => {
  const productId = id;

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch<AppDispatch>();

  const cart = useSelector((state: ReduxState) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <div>
      <h1>SHOPPING CART</h1>
      <div className={styles.itemContainer}>
        {cartItems.length === 0 ? (
          <Message msg='Your cart is empty' />
        ) : (
          <div>
            {cartItems.map((item) => (
              <div className={styles.item} key={item.product}>
                <img src={item.image} alt={item.name} />
                <Link to={`/product/${item.product}`}>
                  <div>{item.name}</div>
                </Link>
                <div>${item.price}</div>
                <select
                  className={styles.select}
                  value={item.qty}
                  onChange={(e) =>
                    dispatch(addToCart(item.product, Number(e.target.value)))
                  }
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
                <MdDelete
                  className={styles.delete}
                  onClick={() => removeFromCartHandler(item.product)}
                />
              </div>
            ))}
          </div>
        )}

        <div className={styles.checkout}>
          <div className={styles.subTotal}>
            <h2>
              SUBTOTAL ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              ITEMS
            </h2>
            <div>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </div>
          </div>
          <div className={styles.addToCart}>
            <button
              onClick={checkoutHandler}
              className={
                cartItems.length !== 0
                  ? styles.addToCartBtn
                  : styles.addToCartBtnDisabled
              }
              disabled={cartItems.length === 0}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
