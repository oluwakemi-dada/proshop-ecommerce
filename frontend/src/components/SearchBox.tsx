import { FC, useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../styles/Header.module.scss';

const SearchBox: FC = () => {
  const [keyword, setKeyword] = useState<string>('');
  const { push } = useHistory();

  // HANDLER
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim()) {
      push(`/search/${keyword}`);
    } else {
      push('/');
    }
  };

  return (
    <form className={styles.searchInputBtn} onSubmit={onSubmitHandler}>
      <input
        type='text'
        name='search'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className={styles.searchInput}
      />
      <button type='submit' className={styles.searchBtn}>
        SEARCH
      </button>
    </form>
  );
};

export default SearchBox;
