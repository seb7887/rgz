import App, { Container } from "next/app";
import Page from "../components/Page/Page";
import { getItems } from '../services/api';

class MyApp extends App {
  state = {
    me: {},
  };

  static async getInitialProps() {
    const res = await getItems();
    const items = await res.json();
    console.log(items);
    return { items };
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
          <Component loadCustomer={this.loadCustomer} items={this.props.items}/>
        </Page>
      </Container>
    );
  }
}

export default MyApp;
