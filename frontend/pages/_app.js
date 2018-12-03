import App, { Container } from "next/app";
import Page from "../components/Page/Page";

class MyApp extends App {
  state = {
    me: {}
  };

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
        <Page unloadCustomer={this.unloadCustomer}>
          <Component loadCustomer={this.loadCustomer} />
        </Page>
      </Container>
    );
  }
}

export default MyApp;
