import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import StripeCheckout from 'react-stripe-checkout';
import NProgress from 'nprogress';
import calcTotalPrice from '../../lib/calcTotalPrice';
import { stripeToken } from '../../config';
import { getCookie } from '../../lib/session';
import { createOrder } from '../../services/api';

class Payment extends React.Component {
  static propTypes = {
    customer: PropTypes.object.isRequired,
    cart: PropTypes.array.isRequired
  };
  
  onToken = async (res) => {
    NProgress.start();
    console.log(res.id);
    const token = getCookie('token');
    const order = await createOrder(this.props.customer.customer_id, res.id, token)
      .catch(err => alert(err.message));
    this.props.updateCart();
    Router.push('/orders');
  }

  totalItems = (cart) => {
    return cart.reduce((tally, item) => tally + item.quantity, 0);
  }

  render() {
    const { cart, customer } = this.props;
    return (
      <StripeCheckout
        amount={calcTotalPrice(cart)}
        name="RGZ"
        description={`Order of ${this.totalItems(cart)} items!`}
        image={cart[0] && cart[0].image}
        stripeKey={stripeToken}
        currency="USD"
        email={customer.email}
        token={res => this.onToken(res)}
      >
        {this.props.children}
      </StripeCheckout>
    )
  }
}

export default Payment;
