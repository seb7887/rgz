import React from 'react';
import PropTypes from 'prop-types';
import BigButton from '../styles/BigButton';
import { getCookie } from '../../lib/session';
import { me, removeCartItem } from '../../services/api';

class RemoveFromCart extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    updateCart: PropTypes.func.isRequired
  }

  handleClick = async (e) => {
    e.preventDefault();
    const token = getCookie('token');
    const current = await me(token);
    const customer = await current.json();
    const req = await removeCartItem(customer.customer_id, this.props.id, token);
    console.log(req.json());
    this.props.updateCart();
  }

  render() {
    return (
      <BigButton onClick={this.handleClick}>
        &times;
      </BigButton>
    );
  }
}

export default RemoveFromCart;
