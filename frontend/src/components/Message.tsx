import { FC } from 'react';
import styled from 'styled-components';

interface VariantType {
  variant: string;
}

const Wrapper = styled.div`
  background: ${({ variant }: VariantType) =>
    variant === 'default' ? '#d2ebf5' : '#F7DDDC'};
  color: ${({ variant }: VariantType) =>
    variant === 'default' ? '#225f78' : '#712B29'};
  padding: 1rem 2rem;
  height: fit-content;
  margin: 2rem 0 1.5rem 0;
`;

interface MessageProps {
  msg: string;
  variant: string;
}

const Message: FC<MessageProps> = ({ msg, variant }) => {
  return <Wrapper variant={variant}>{msg}</Wrapper>;
};

export default Message;
