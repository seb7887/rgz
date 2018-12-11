import styled from 'styled-components';

const Supreme = styled.h3`
  background: ${props => props.theme.red};
  color: ${props => props.theme.white};
  display: inline-block;
  padding: 4px 5px;
  text-transform: uppercase;
  transform: skew(-3deg);
  margin: 0;
  font-size: 4rem;
`;

export default Supreme;
