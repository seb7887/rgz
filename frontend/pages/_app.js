import App, { Container } from "next/app";
import Router from "next/router";
import Page from "../components/Page/Page";
import { getPage, getTotalOfItems } from '../services/api';

class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      me: {},
      items: {},
      item: {},
      count: 0,
      page: 1,
      cartOpen: false,
    }
  }
  
  static async getInitialProps() {
    const req = await getTotalOfItems();
    const count = await req.json();
    const val = count.total.count;
    const res = await getPage(0);
    const items = await res.json();
    return { items, val };
  }

  componentWillMount = async () => {
    this.setState({
      items: this.props.items,
      count: Number(this.props.val)
    });
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

  refreshItems = async () => {
    const req = await getTotalOfItems();
    const count = await req.json();
    const val = count.total.count;
    const res = await getPage(0);
    const items = await res.json();
    this.setState({
      items: items,
      count: Number(val)
    });
    Router.push('/');
  }

  loadPage = async (data, offset) => {
    const res = await getPage(offset);
    const items = await res.json();
    this.setState({
      items: items,
      page: data
    });
    Router.push('/');
  }

  toggleCart = (e) => {
    e.preventDefault();
    this.setState({ cartOpen: !this.state.cartOpen });
  }

  render() {
    const { Component } = this.props;
    return (
      <Container>
        <Page 
          unloadCustomer={this.unloadCustomer}
          refreshItems={this.refreshItems}
          me={this.state.me}
          toggleCart={this.toggleCart}
          open={this.state.cartOpen}
        >
          <Component
            loadCustomer={this.loadCustomer}
            items={this.state.items}
            item={this.state.item}
            count={this.state.count}
            page={this.state.page}
            loadItem={this.loadItem}
            loadPage={this.loadPage}
            refreshItems={this.refreshItems}
          />
        </Page>
      </Container>
    );
  }
}

export default MyApp;
