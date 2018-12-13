import PleaseSignIn from '../components/PleaseSignIn/PleaseSignIn';
import Orders from '../components/Orders/Orders';

const OrderPage = (props) => (
  <div>
    <PleaseSignIn {...props}>
      <Orders customer={props.me.customer_id} />
    </PleaseSignIn>
  </div>
)

export default OrderPage;
