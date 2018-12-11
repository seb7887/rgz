import Items from '../components/Items/Items';
import { getItems } from '../services/api';
import React from 'react';

const Home = (props) => (
  <Items 
    items={props.items}
    count={props.count}
    page={props.page}
    loadItem={props.loadItem}
    loadPage={props.loadPage}
    refreshItems={props.refreshItems}
    updateCart={props.updateCart}
  />
)

export default Home;
