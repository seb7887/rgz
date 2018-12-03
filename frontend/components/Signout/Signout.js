import React from 'react';
import Router from 'next/router';
import { removeCookie } from '../../lib/session';

class Signout extends React.Component {
  handleClick = e => {
    e.preventDefault();
    removeCookie('token');
    Router.push('/');
  }

  render() {
    return (
      <button onClick={this.handleClick}>Sign out</button>
    );
  }
}

export default Signout;
