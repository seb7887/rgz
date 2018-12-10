import React from 'react';
import Signin from '../Signin/Signin';
import { getCookie } from '../../lib/session';

class PleaseSignIn extends React.Component {
  render() {
    if(!getCookie('token')) {
      return (
        <div>
          <p>Please Sign In before continuing</p>
          <Signin loadCustomer={this.props.loadCustomer} />
        </div>
      );
    } else {
      return (
        this.props.children
      );
    }
  }
}

export default PleaseSignIn;
