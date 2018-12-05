import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';
import StyledItem from './StyledItem';
import Title from '../styles/Title';
import PriceTag from '../styles/PriceTag';
import formatMoney from '../../lib/formatMoney';
import { getItem } from '../../services/api';
import { getCookie } from '../../lib/session';

class Item extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  handleClick = async (e) => {
    e.preventDefault();
    const token = getCookie('token');
    const req = await getItem(this.props.item.item_id, token);
    const data = await req.json();
    console.log(data);
    this.props.loadItem(data);
    Router.push(`/item`);
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
          <Link href="/">
            <a>Edit</a>
          </Link>
        </div>
      </StyledItem>
    );
  }
}

export default Item;
