import App, { Container } from "next/app";
import Router from 'next/router';
import Page from "../components/Page/Page";
import { getItems } from '../services/api';

class MyApp extends App {
  state = {
    me: {},
    items: {}
  };

  static async getInitialProps() {
    const res = await getItems();
    const items = await res.json();
    console.log(items);
    return { items };
  }

  componentWillMount() {
    this.setState({ items: this.props.items });
  }

  loadCustomer = (data) => {
    this.setState({ me: data });
  }

  unloadCustomer = () => {
    this.setState({ me: {} });
  }

  render() {
    const { Component } = this.props;
    return (
      <Container>
        <Page unloadCustomer={this.unloadCustomer} >
          <Component loadCustomer={this.loadCustomer} items={this.state.items}/>
        </Page>
      </Container>
    );
  }
}

export default MyApp;
