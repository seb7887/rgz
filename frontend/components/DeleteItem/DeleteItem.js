import React from 'react';
import Router from 'next/router';
import { deleteItem } from '../../services/api';
import { getCookie } from '../../lib/session';

class DeleteItem extends React.Component {
  
  delete = async (e) => {
    e.preventDefault();
    if (confirm('Are you sure you want to delete this item?')) {
      const token = getCookie('token');
      const req = await deleteItem(this.props.id, token);
      const deleted = await req.json();
      console.log(deleted);
      Router.push('/');
    }
  }

  render() {
    return (
      <button onClick={this.delete}>
        {this.props.children}
      </button>
    );
  }
}

export default DeleteItem;
