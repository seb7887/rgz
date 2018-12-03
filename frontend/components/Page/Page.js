import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import StyledPage, { theme } from './StyledPage';
import Header from '../Header/Header';
import Meta from '../Meta/Meta';

/**
 * Styles
 */

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'Palanquin';
    font-weight: 300;
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.black};
  }
`;

/**
 * Component
 */

class Page extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <GlobalStyle />
          <Meta />
          <Header {...this.props}/>
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
