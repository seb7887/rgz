import React from 'react';
import { getCookie } from '../../lib/session';
import { me, addCartItem } from '../../services/api';

class AddToCart extends React.Component {
  handleClick = async (e) => {
    e.preventDefault();
    const token = getCookie('token');
    const current = await me(token);
    const customer = await current.json();
    const req = await addCartItem(customer.customer_id, this.props.id, token);
    console.log(req.json());
    this.props.updateCart();
  }
  
  render() {
    return (
      <button onClick={this.handleClick}>Add to Cart</button>
    );
  }
}

export default AddToCart;
