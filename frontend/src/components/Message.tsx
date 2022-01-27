import { FC } from 'react';
import styles from '../styles/Message.module.scss';

interface MessageProps {
  msg: string;
}
const Message: FC<MessageProps> = ({ msg }) => {
  return <div className={styles.container}>{msg}</div>;
};

export default Message;
