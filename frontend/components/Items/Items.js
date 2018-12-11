import React from 'react';
import PropTypes from 'prop-types';
import Item from '../Item/Item';
import Pagination from '../Pagination/Pagination';
import { Center, ItemList } from './StyledItems';

const Items = (props) => (
  <Center>
    <Pagination page={props.page} count={props.count} loadPage={props.loadPage} />
    <ItemList>
      {
        props.items.map(item => <Item item={item} key={item.item_id} loadItem={props.loadItem} refreshItems={props.refreshItems} updateCart={props.updateCart} />)
      }
    </ItemList>
    <Pagination page={props.page} count={props.count} loadPage={props.loadPage} />
  </Center>
)

Items.propTypes = {
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
}

export default Items;
