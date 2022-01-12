import { FC } from 'react';
import { css } from '@emotion/react';
import PulseLoader from 'react-spinners/PulseLoader';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-color: #343a40;
 
`;

const Loader: FC = () => {
  return (
    <div className='sweet-loading'>
      <PulseLoader color={'#343A40'} loading={true} css={override} size={10} />
    </div>
  );
};

export default Loader;
