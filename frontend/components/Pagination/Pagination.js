import React from 'react';
import Head from 'next/head';
import StyledPagination from './StyledPagination';
import { perPage } from '../../config';

class Pagination extends React.Component {
  nextPage = () => {
    const page = this.props.page + 1;
    const offset = (page - 1) * perPage;
    this.props.loadPage(page, offset);
  }

  prevPage = () => {
    const page = this.props.page - 1;
    const offset = (page - 1) * perPage;
    this.props.loadPage(page, offset);
  }

  
  render() {
    const { count, page } = this.props;
    const pages = Math.ceil(count / perPage);

    return (
      <StyledPagination>
        <Head>
          <title>RGZ | Page {page} of {pages}!</title>
        </Head>
        <a 
          className="prev"
          aria-disabled={page <= 1}
          onClick={this.prevPage}
        >
          ← Prev
        </a>
        <p>Page {page} of <span className="totalPages">{pages}</span></p>
        <p>{count} Items Total</p>
        <a
          className="next"
          aria-disabled={page >= pages}
          onClick={this.nextPage}
        >
          Next →
        </a>
      </StyledPagination>
    );
  }
}

export default Pagination;
