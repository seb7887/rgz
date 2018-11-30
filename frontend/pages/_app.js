import App, { Container } from "next/app";
import withReduxStore from '../lib/withReduxStore';
import { Provider } from 'react-redux';
import Page from "../components/Page/Page";

class MyApp extends App {
  render() {
    const { Component, reduxStore } = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
          <Page>
            <Component />
          </Page>
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
