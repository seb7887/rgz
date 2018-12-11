import React from 'react';
import Link from "next/link";
import styled from 'styled-components';
import NProgress from 'nprogress';
import Router from 'next/router';
import StyledHeader from "./StyledHeader";
import Nav from "../Nav/Nav";
import Cart from "../Cart/Cart";
import { getCookie } from "../../lib/session";

/**
 * NProgress slim progress bar setup
 */

Router.onRouteChangeStart = () => {
  NProgress.start();
}

Router.onRouteChangeComplete = () => {
  NProgress.done();
}

Router.onRouteChangeError = () => {
  NProgress.done();
}


/**
 * Styles
 */

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  
  a {
    padding: 0.5rem 1rem;
    background: ${props => props.theme.black};
    color: ${props => props.theme.white};
    text-decoration: none;
  }

  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

/**
 * Component
 */

const Header = (props) => (
  <StyledHeader>
    <div className='bar'>
      <Logo>
        <Link href="/">
          <a>RGZ</a>
        </Link>
      </Logo>
      <Nav {...props}/>
    </div>
    <div className='sub-bar'>
      <p>Search</p>
    </div>
    { getCookie('token') &&
      <Cart
        open={props.open}
        toggleCart={props.toggleCart}
        update={props.update}
      />
    }
  </StyledHeader>
);

export default Header;
