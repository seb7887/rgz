import styled from 'styled-components';

const CloseButton = styled.button`
  background: ${props => props.theme.black};
  color: ${props => props.theme.white};
  font-size: 3rem;
  position: absolute;
  z-index: 2;
  border: 0;
  right: 0;
  cursor: pointer;
`;

export default CloseButton;
