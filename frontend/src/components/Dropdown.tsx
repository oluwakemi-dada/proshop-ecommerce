import {FC} from 'react';
import { Link } from 'react-router-dom';

const Dropdown: FC = () => {
  return (
    <div>
      <Link to=''>
        <div>Profile</div>
      </Link>
      <Link to=''>
        <div>Logout</div>
      </Link>
    </div>
  );
};

export default Dropdown;
