import Items from '../components/Items/Items';
import { getItems } from '../services/api';
import React from 'react';

const Home = (props) => (
  <Items items={props.items} loadItem={props.loadItem} />
)

export default Home;
