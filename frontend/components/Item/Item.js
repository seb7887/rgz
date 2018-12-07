import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import StyledItem from './StyledItem';
import Title from '../styles/Title';
import PriceTag from '../styles/PriceTag';
import DeleteItem from '../DeleteItem/DeleteItem';
import formatMoney from '../../lib/formatMoney';
import { getItem } from '../../services/api';
import { getCookie } from '../../lib/session';

class Item extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  getFromAPI = async () => {
    const token = getCookie('token');
    const req = await getItem(this.props.item.item_id, token);
    const data = await req.json();
    console.log(data);
    this.props.loadItem(data);
  }

  handleClick = (e) => {
    e.preventDefault();
    console.log('show item');
    this.getFromAPI();
    Router.push('/item');
  }

  handleUpdate = (e) => {
    e.preventDefault();
    console.log('update');
    this.getFromAPI();
    Router.push('/update');
  }

  render() {
    const { item } = this.props;
    return (
      <StyledItem>
        {item.image && <img src={item.image} alt={item.title} />}
        <Title>
          <a onClick={this.handleClick}>{item.title}</a>
        </Title>
        <PriceTag>{formatMoney(item.price)}</PriceTag>
        <p>{item.description}</p>

        <div className="buttonList">
          <a onClick={this.handleUpdate}>Edit</a>
          <DeleteItem id={item.item_id} refreshItems={this.props.refreshItems}>Delete</DeleteItem>
        </div>
      </StyledItem>
    );
  }
}

export default Item;
