import { useState, useEffect, FormEvent } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import styles from '../styles/UserEditScreen.module.scss';
import { AppDispatch } from '../store';
import { ReduxState } from '../types';
import { getUserDetails, updateUser } from '../actions/userActions';
import { UserUpdateActionTypes } from '../types';

interface MatchParams {
  id: string;
}

interface UserEditScreenProps extends RouteComponentProps<MatchParams> {}

const UserEditScreen = ({ match, history }: UserEditScreenProps) => {
  const userId = match.params.id;

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  // SELECTORS
  const userDetails = useSelector((state: ReduxState) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state: ReduxState) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({
        type: UserUpdateActionTypes.USER_UPDATE_RESET,
      });
      history.push('/admin/userlist');
    } else {
      if (!user || !user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, userId, user, history, successUpdate]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      <Link to='/admin/userlist'>
        <div className={styles.back}>GO BACK</div>
      </Link>
      <FormContainer>
        <h1>EDIT USER</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message msg={errorUpdate} variant='danger' />}
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
                placeholder='Enter Name'
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor='email'>Email Address</label>
              <input
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter Email'
              />
            </div>

            <div className={styles.formCheck}>
              <input
                type='checkbox'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              <label htmlFor='isAdmin'>Is Admin</label>
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

export default UserEditScreen;
