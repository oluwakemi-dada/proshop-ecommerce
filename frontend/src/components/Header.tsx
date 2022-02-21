import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaUser, FaTimes } from 'react-icons/fa';
import { RiMenu3Line } from 'react-icons/ri';
import styled from 'styled-components';
import SearchBox from './SearchBox';
import { AppDispatch } from '../store';
import { ReduxState } from '../types';
import { logout } from '../actions/userActions';
import styles from '../styles/Header.module.scss';

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #343a40;
  height: 9.3rem;
  transition: all 0.5s ease;
  margin-bottom: ${({ clicked }: { clicked: boolean }) =>
    clicked ? '17rem' : '0'};
`;

const NavMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-left: 10rem;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 27rem;
    position: absolute;
    top: 9.3rem;
    background: #343a40;
    opacity: 1;
    transition: all 0.5s ease;
    margin-left: 0;
    left: ${({ clicked }: { clicked: boolean }) => (clicked ? '0' : '-100%')};
  }
`;

const Header: FC = () => {
  const [clicked, setClicked] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const userLogin = useSelector((state: ReduxState) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    setClicked(false);
  };

  return (
    <StyledHeader clicked={clicked}>
      <div className='container'>
        <nav className={styles.nav}>
          <Link to='/'>
            <h1 className={styles.logo} onClick={() => setClicked(false)}>
              PROSHOP
            </h1>
          </Link>
          <div className={styles.menuIcon} onClick={() => setClicked(!clicked)}>
            {clicked ? <FaTimes /> : <RiMenu3Line />}
          </div>
          <NavMenu clicked={clicked}>
            <SearchBox />
            <div className={styles.navLinks}>
              <Link to='/cart'>
                <div className={styles.cart} onClick={() => setClicked(false)}>
                  <FaShoppingCart />
                  <span>CART</span>
                </div>
              </Link>
              {userInfo ? (
                <Link to='/profile'>
                  <div
                    className={styles.user}
                    onClick={() => setClicked(false)}
                  >
                    <FaUser className={styles.userIcon} />
                    <div>{userInfo.name.toUpperCase()}</div>
                  </div>
                </Link>
              ) : (
                <Link to='/login'>
                  <div
                    className={styles.signIn}
                    onClick={() => setClicked(false)}
                  >
                    <FaUser />
                    <span>SIGN IN</span>
                  </div>
                </Link>
              )}

              {userInfo && userInfo.isAdmin && (
                <Link to='/admin/userlist'>
                  <div
                    className={styles.users}
                    onClick={() => setClicked(false)}
                  >
                    USERS
                  </div>
                </Link>
              )}

              {userInfo && userInfo.isAdmin && (
                <Link to='/admin/productlist'>
                  <div
                    className={styles.products}
                    onClick={() => setClicked(false)}
                  >
                    PRODUCTS
                  </div>
                </Link>
              )}

              {userInfo && userInfo.isAdmin && (
                <Link to='/admin/orderlist'>
                  <div
                    className={styles.orders}
                    onClick={() => setClicked(false)}
                  >
                    ORDERS
                  </div>
                </Link>
              )}

              {userInfo && (
                <Link to=''>
                  <div onClick={logoutHandler} className={styles.logout}>
                    LOGOUT
                  </div>
                </Link>
              )}
            </div>
          </NavMenu>
        </nav>
      </div>
    </StyledHeader>
  );
};

export default Header;
