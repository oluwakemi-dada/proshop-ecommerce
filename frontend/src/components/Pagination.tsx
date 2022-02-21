import { Link } from 'react-router-dom';
import styles from '../styles/Pagination.module.scss';

interface PaginateProps {
  pages: number;
  page: number;
  isAdmin?: boolean;
  keyword?: string;
}

const Pagination = ({
  pages,
  page,
  isAdmin = false,
  keyword = '',
}: PaginateProps) => {
  return (
    <>
      {pages > 1 && (
        <div className={styles.pages}>
          {[...Array(pages).keys()].map((x) => (
            <Link
              key={x + 1}
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${x + 1}`
                    : `/page/${x + 1}`
                  : `/admin/productlist/${x + 1}`
              }
            >
              <div className={x + 1 === page ? styles.active : styles.inactive}>
                {x + 1}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Pagination;
