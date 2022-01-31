import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaUser, FaTimes } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { RiMenu3Line } from 'react-icons/ri';
import styled from 'styled-components';
import { AppDispatch } from '../store';
import { ReduxState } from '../types';
import Dropdown from './Dropdown';
import styles from '../styles/Header.module.scss';

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #343a40;
  height: 9.3rem;
  transition: all 0.5s ease;
  margin-bottom: ${({ clicked }: { clicked: boolean }) =>
    clicked ? '15rem' : '0'};
`;

const NavMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-left: 10rem;

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 15rem;
    position: absolute;
    top: 9.3rem;
    background: #343a40;
    opacity: 1;
    transition: all 0.5s ease;
    margin-left: 0;
    left: ${({ clicked }: { clicked: boolean }) => (clicked ? '0' : '-100%')};
  }
`;

const User = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  transition: 0.15s;
  color: ${({ userClicked }: { userClicked: boolean }) =>
    userClicked ? '#fff' : '#b4b6b8'};

  &:hover {
    color: #fff;
  }
  div {
    margin-right: 0.2rem;
  }
`;

const Header: FC = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [userClicked, setUserClicked] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const userLogin = useSelector((state: ReduxState) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <StyledHeader clicked={clicked}>
      <div className='container'>
        <nav className={styles.nav}>
          <Link to='/'>
            <h1 className={styles.logo}>PROSHOP</h1>
          </Link>
          <div className={styles.menuIcon} onClick={() => setClicked(!clicked)}>
            {clicked ? <FaTimes /> : <RiMenu3Line />}
          </div>
          <NavMenu clicked={clicked}>
            <div className={styles.searchInputBtn}>
              <input
                type='text'
                placeholder='Search Products...'
                className={styles.searchInput}
              />
              <div className={styles.searchBtn}>SEARCH</div>
            </div>
            <div className={styles.cartSignInUser}>
              <Link to='/cart'>
                <div className={styles.cart}>
                  <FaShoppingCart />
                  <span>CART</span>
                </div>
              </Link>
              {userInfo ? (
                <div>
                  <User
                    userClicked={userClicked}
                    onClick={() => setUserClicked(!userClicked)}
                  >
                    <div>KEMI</div>
                    <IoMdArrowDropdown />
                  </User>
                  <DropDown />
                  {/* {userClicked && <Dropdown />} */}
                </div>
              ) : (
                <Link to='/login'>
                  <div className={styles.signIn}>
                    <FaUser />
                    <span>SIGN IN</span>
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
