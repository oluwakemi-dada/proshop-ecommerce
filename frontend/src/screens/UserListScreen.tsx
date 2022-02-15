import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import styles from '../styles/UserListScreen.module.scss';
import { listUsers } from '../actions/userActions';
import { AppDispatch } from '../store';
import { ReduxState } from '../types';
import { FaTimes, FaCheck, FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';

const UserListScreen: FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch<AppDispatch>();

  const userList = useSelector((state: ReduxState) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state: ReduxState) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  const deleteHandler = (id: string) => {
    console.log(id);
  };

  return (
    <div className={styles.usersWrapper}>
      <h1 className={styles.usersHeading}>USERS</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message msg={error} variant='danger' />
      ) : (
        <div className={styles.usersTable}>
          <div className={styles.tableHead}>
            <div>ID</div>
            <div>NAME</div>
            <div>EMAIL</div>
            <div>ADMIN</div>
            <div></div>
          </div>
          <div>
            {users.map((user) => (
              <div key={user._id} className={styles.user}>
                <div>{user._id}</div>
                <div>{user.name}</div>
                <div>
                  <a href={`mailto:${user.email}`} className={styles.mailTo}>
                    {user.email}
                  </a>
                </div>
                <div>
                  {user.isAdmin ? (
                    <FaCheck className={styles.checkIcon} />
                  ) : (
                    <FaTimes className={styles.timesIcon} />
                  )}
                </div>
                <div className={styles.deleteEditIcons}>
                  <Link to={`/user/${user._id}/edit`}>
                    <div className={styles.editIcon}>
                      <FaEdit />
                    </div>
                  </Link>

                  <div
                    onClick={() => deleteHandler(user._id)}
                    className={styles.deleteIcon}
                  >
                    <AiFillDelete />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserListScreen;
