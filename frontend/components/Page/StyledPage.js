import styled from 'styled-components';

export const theme = {
  black: '#010101',
  white: '#fffafa',
  red: '#c10e1f',
  orange: '#ef7674',
  grey: '#3a3a3a',
  lightgrey: '#e1e1e1',
  offWhite: '#ededed',
  maxWidth: '1000px',
  shadow: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

const StyledPage = styled.div`
  background: ${props => props.theme.white};
  color: ${props => props.theme.black};
`;

export default StyledPage;
