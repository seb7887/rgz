import React from 'react';
import Item from '../Item/Item';
import { Center, ItemList } from './StyledItems';

const Items = (props) => (
  <Center>
    <ItemList>
      {
        props.items.map(item => <Item item={item} key={item.item_id} loadItem={props.loadItem} />)
      }
    </ItemList>
  </Center>
)

export default Items;
