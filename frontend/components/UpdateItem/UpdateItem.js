import React from 'react';
import Router from 'next/router';
import Form from '../styles/Form';
import { updateItem } from '../../services/api';
import { getCookie } from '../../lib/session';

class UpdateItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      title: '',
      brand: '',
      model: '',
      description: '',
      price: 0
    };
  }

  componentDidMount = () => {
    this.setState({
      item: this.props.item,
      title: this.props.item.title,
      brand: this.props.item.brand,
      model: this.props.item.model,
      description: this.props.description,
      price: this.props.item.price
    });
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.item !== prevProps.item) {
      this.setState({ 
        item: this.props.item,
        title: this.props.item.title,
        brand: this.props.item.brand,
        model: this.props.item.model,
        description: this.props.description,
        price: this.props.item.price
      });
    }
  }

  handleChange = e => {
    e.preventDefault();
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  }

  update = async (e) => {
    e.preventDefault();
    const token = getCookie('token');
    const req = await updateItem(this.state.item.item_id, token, this.state);
    const updated = await req.json();
    console.log(updated);
    Router.push('/');
  }

  render() {
    const { item } = this.state;
    return (
      <Form onSubmit={this.update}>
        <fieldset>
          <h2>Update Item</h2>
          <hr />
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              required
              defaultValue={item.title}
              onChange={this.handleChange}
            />
            </label>
            <label htmlFor="brand">
            Brand
            <input
              type="text"
              id="brand"
              name="brand"
              placeholder="Brand"
              required
              defaultValue={item.brand}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="model">
            Model
            <input
              type="text"
              id="model"
              name="model"
              placeholder="Model"
              required
              defaultValue={item.model}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="description">
            Description
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Description"
              required
              defaultValue={item.description}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="price">
            Price
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Price"
              required
              defaultValue={item.price}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Update</button>
        </fieldset>
      </Form>
    )
  }
}

export default UpdateItem;
