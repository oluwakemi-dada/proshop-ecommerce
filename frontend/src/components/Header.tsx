import { FC, useState } from 'react';
import styled from 'styled-components';
import { FaShoppingCart, FaUser, FaTimes } from 'react-icons/fa';
import { RiMenu3Line } from 'react-icons/ri';
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

const Header: FC = () => {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <StyledHeader clicked={clicked}>
      <div className='container'>
        <nav className={styles.nav}>
          <h1 className={styles.logo}>PROSHOP</h1>
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
            <div className={styles.cartSignIn}>
              <div className={styles.cart}>
                <FaShoppingCart />
                <span>CART</span>
              </div>
              <div className={styles.signIn}>
                <FaUser />
                <span>SIGN IN</span>
              </div>
            </div>
          </NavMenu>
        </nav>
      </div>
    </StyledHeader>
  );
};

export default Header;
