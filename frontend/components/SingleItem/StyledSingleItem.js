import styled from 'styled-components';

const StyledSingleItem = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .details {
    margin: 3rem;
    font-size: 2rem;
  }

  ul {
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    box-sizing: border-box;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      flex-direction: column;

      strong {
        font-size: 1.5rem;
        opacity: 0.5;
      }

      span {
        text-transform: uppercase;
      }

    }
  }
`;

export default StyledSingleItem;
