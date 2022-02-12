import { FC } from 'react';
import styled from 'styled-components';

interface VariantType {
  variant: string;
}

const Wrapper = styled.div`
  padding: 1rem 2rem;
  height: fit-content;
  margin: 2rem 0 1.5rem 0;
  background: ${({ variant }: VariantType) => {
    if (variant === 'default') {
      return '#d2ebf5';
    } else if (variant === 'danger') {
      return '#F7DDDC';
    } else if (variant === 'success') {
      return '#d1e7dd';
    } else if (variant === 'caution') {
      return '#fff3cd';
    } else {
      return '#D3D3D4';
    }
  }};
  color: ${({ variant }: VariantType) => {
    if (variant === 'default') {
      return '#225f78';
    } else if (variant === 'danger') {
      return '#712B29';
    } else if (variant === 'success') {
      return '#0F5132';
    } else if (variant === 'caution') {
      return '#755D16';
    } else {
      return '#141619';
    }
  }};
`;

interface MessageProps {
  msg: string;
  variant: string;
}

const Message: FC<MessageProps> = ({ msg, variant }) => {
  return <Wrapper variant={variant}>{msg}</Wrapper>;
};

export default Message;
