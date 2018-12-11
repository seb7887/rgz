import styled from 'styled-components';

const StyledCartItem = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.lightgrey};
  align-items: center;
  display: grid;
  grid-template-columns: auto 1fr auto;

  img {
    margin-right: 10px;
  }

  h3,
  p {
    margin: 0;
  }
`;

export default StyledCartItem;
