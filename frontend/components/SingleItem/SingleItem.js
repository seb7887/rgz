import React from 'react';
import Head from 'next/head';
import StyledSingleItem from './StyledSingleItem';

class SingleItem extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <StyledSingleItem>
        <Head>
          <title>RGZ | {item.title}</title>
        </Head>
        <img src={item.large_image} alt={item.title} />
        <div className="details">
          <h2>Viewing {item.title}</h2>
          <h3>Description</h3>
          <p>{item.description}</p>
          <h3>Characteristics</h3>
          <ul>
            <li>
              <strong>Brand</strong>
              <span>{item.brand}</span>
            </li>
            <li>
              <strong>Model</strong>
              <span>{item.model}</span>
            </li>
            <li>
              <strong>Gender</strong>
              <span>{item.gender}</span>
            </li>
            <li>
              <strong>Type</strong>
              <span>{item.product}</span>
            </li>
          </ul>
        </div>
      </StyledSingleItem>
    );
  }
}

export default SingleItem;
