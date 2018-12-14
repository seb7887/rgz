import React from 'react';
import StyledCart from './StyledCart';
import Button from '../styles/Button';
import CloseButton from '../styles/CloseButton';
import Supreme from '../styles/Supreme';
import CartItem from '../CartItem/CartItem';
import Payment from '../Payment/Payment';
import calcTotalPrice from '../../lib/calcTotalPrice';
import formatMoney from '../../lib/formatMoney';
import { getCookie } from '../../lib/session';
import { me, getCartItems } from '../../services/api';

class Cart extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      me: {},
      cartItems: []
    };
  }

  fetchCartItems = async () => {
    const token = getCookie('token');
    const current = await me(token);
    const customer = await current.json();
    const req = await getCartItems(customer.customer_id, token);
    const items = await req.json();
    if (items !== 'Empty Cart') {
      this.setState({
        me: customer,
        cartItems: items
      });
    }
  }

  componentDidMount = () => {
    this.fetchCartItems();
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.update !== prevProps.update) {
      this.fetchCartItems();
    }
  }

  render() {
    const { me, cartItems } = this.state;
    if (!cartItems.length) {
      return (
        <StyledCart>
          <header>
            <p>You have no items in your cart</p>
          </header>
        </StyledCart>
      )
    }
    return (
      <StyledCart open={this.props.open}>
        <header>
          <CloseButton onClick={this.props.toggleCart}>&times;</CloseButton>
          <Supreme>{me.name}</Supreme>
          <p>You have {cartItems.length} Item{cartItems.length === 1 ? '' : 's'} in your cart</p>
        </header>

        <ul>
          { cartItems.map(item =>
            <CartItem 
              key={item.cart_item_id}
              cartItem={item}
              updateCart={this.props.updateCart}
            />) }
        </ul>

        <footer>
          <p>{formatMoney(calcTotalPrice(cartItems))}</p>
          { cartItems.length && (
            <Payment
              cart={cartItems}
              customer={me}
              updateCart={this.props.updateCart}
            >
              <Button>Checkout</Button>
            </Payment>
          )}
        </footer>
      </StyledCart>
    );
  }
}

export default Cart;
