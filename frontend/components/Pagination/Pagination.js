import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import StyledPagination from './StyledPagination';
import { perPage } from '../../config';

const Pagination = (props) => {
  const count = props.items.lenght;
  const pages = Math.ceil(count / perPage);
  const page = props.page;

  return (
    <StyledPagination>
      <Head>
        <title>RGZ | Page {page} of {pages}!</title>
      </Head>
      <a className="prev" aria-disabled={page <= 1}>← Prev</a>
      <p>Page {props.page} of <span className="totalPages">{pages}</span></p>
      <p>{count} Items Total</p>
      <a className="next" aria-disabled={page >= pages}>Next →</a>
    </StyledPagination>
  )
}

export default Pagination;
