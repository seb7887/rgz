import React from 'react';
import Router from 'next/router';
import Form from '../styles/Form';
import { uploadImage, createItem } from '../../services/api';
import { getCookie } from '../../lib/session';

class CreateItem extends React.Component {
  state = {
    title: '',
    brand: '',
    model: '',
    gender: 'male',
    product: 'shoes',
    description: '',
    image: '',
    largeImage: '',
    price: 0
  };

  handleChange = e => {
    e.preventDefault();
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  }

  uploadFile = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'rgz-img');

    const res = await uploadImage(data);
    const file = await res.json();
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const token = getCookie('token');
    const res = await createItem(this.state, token);
    this.props.refreshItems();
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <fieldset>
          <h2>Sell an item</h2>
          <hr />
          <label htmlFor="file">
            Image
            <input
              type="file"
              id="file"
              name="file"
              placeholder="Upload an image"
              required
              onChange={this.uploadFile}
            />
            { this.state.image && (
              <img width="200" src={this.state.image} alt="Upload Preview" />
            )}
          </label>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              required
              value={this.state.title}
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
              value={this.state.brand}
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
              value={this.state.model}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="gender">
            Gender
            <div>
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked="checked"
                onChange={this.handleChange}
              />
              <label htmlFor="female">Female</label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                onChange={this.handleChange}
              />
            </div>
          </label>
          <label htmlFor="product">
            Type of product
            <div>
              <label htmlFor="shoes">Shoes</label>
              <input
                type="radio"
                id="shoes"
                name="product"
                value="shoes"
                checked="checked"
                onChange={this.handleChange}
              />
              <label htmlFor="jeand">Jeans</label>
              <input
                type="radio"
                id="jeans"
                name="product"
                value="jeans"
                onChange={this.handleChange}
              />
              <label htmlFor="accesories">Accesories</label>
              <input
                type="radio"
                id="accesories"
                name="product"
                value="accesories"
                onChange={this.handleChange}
              />
              <label htmlFor="trousers">Trousers</label>
              <input
                type="radio"
                id="trousers"
                name="product"
                value="trousers"
                onChange={this.handleChange}
              />
            </div>
          </label>
          <label htmlFor="description">
            Description
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Description"
              required
              value={this.state.description}
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
              value={this.state.price}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Sell</button>
        </fieldset>
      </Form>
    );
  }
}

export default CreateItem;
