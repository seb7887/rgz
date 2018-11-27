/**
 * _document is only rendered on the server side and not on the client side
 * Event handlers like onClick cannot be added to this file
 * Pages in Next.js skip the definition of the surrounding document's markup.
 * You never include <html>, <body>, etc. To override that default behavior, edit this
 * file.
 */

import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
