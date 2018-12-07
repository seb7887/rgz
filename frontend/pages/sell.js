import CreateItem from '../components/CreateItem/CreateItem';

const Sell = (props) => (
  <div>
    <CreateItem refreshItems={props.refreshItems} />
  </div>
)

export default Sell;
