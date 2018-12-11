import PropTypes from 'prop-types';
import StyledCartItem from './StyledCartItem';
import formatMoney from '../../lib/formatMoney';

const CartItem = ({ cartItem }) => {
  if (!cartItem) {
    return (
      <StyledCartItem>
        <p>This item has been removed</p>
      </StyledCartItem>
    );
  }
  return (
    <StyledCartItem>
      <img width="100" src={cartItem.image} alt={cartItem.title} />
      <div className="cart-item-details">
        <h3>{cartItem.title}</h3>
        <p>
          {formatMoney(cartItem.price * cartItem.quantity)}
          {' - '}
          <em>
            {cartItem.quantity} &times; {formatMoney(cartItem.price)} each
          </em>
        </p>
      </div>
    </StyledCartItem>
  )
}

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
}

export default CartItem;
