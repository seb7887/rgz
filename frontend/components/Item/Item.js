import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import StyledItem from './StyledItem';
import Title from '../styles/Title';
import PriceTag from '../styles/PriceTag';
import formatMoney from '../../lib/formatMoney';

class Item extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const { item } = this.props;
    return (
      <StyledItem>
        {item.image && <img src={item.image} alt={item.title} />}
        <Title>
          <Link href="/">
            <a>{item.title}</a>
          </Link>
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
