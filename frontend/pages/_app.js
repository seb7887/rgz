import App, { Container } from "next/app";
import Page from "../components/Page/Page";
import { getItems } from '../services/api';

class MyApp extends App {
  state = {
    me: {},
    items: {},
    item: {}
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

  loadItem = (data) => {
    this.setState({ item: data});
  }

  render() {
    const { Component } = this.props;
    return (
      <Container>
        <Page unloadCustomer={this.unloadCustomer} >
          <Component
            loadCustomer={this.loadCustomer}
            items={this.state.items}
            item={this.state.item}
            loadItem={this.loadItem}
          />
        </Page>
      </Container>
    );
  }
}

export default MyApp;
