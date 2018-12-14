import React from 'react';
import { StyledOrders, OrderUl } from './StyledOrders';
import formatMoney from '../../lib/formatMoney';
import { getCookie } from '../../lib/session';
import { getOrders } from '../../services/api';

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }

  componentDidMount = async () => {
    const token = getCookie('token');
    const res = await getOrders(this.props.customer, token);
    const orders = await res.json();
    if (orders !== 'No orders') {
      this.setState({ orders: orders });
    }
  }
  
  render() {
    const { orders } = this.state;
    if (orders.length) {
      return (
      <div>
        <h2>You have { orders.length } orders</h2>
        <OrderUl>
          { orders.map(order => (
            <StyledOrders key={order.order_id}>
              <div className="order-meta">
                <p>{order.items.reduce((a, b) => a + b.quantity, 0)} Items</p>
                <p>{order.items.length} Products</p>
                <p>{formatMoney(order.total)}</p>
              </div>
              <div className="images">
                {order.items.map(item => (
                  <img key={item.order_item_id} src={item.image} alt={item.title} />
                ))}
              </div>
            </StyledOrders>
          ))}
        </OrderUl>
      </div>
      );
    } else {
      return (
        <div>
          <h2>You have no orders!</h2>
        </div>
      );
    }
  }
}

export default Orders;
