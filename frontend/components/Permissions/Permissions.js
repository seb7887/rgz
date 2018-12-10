import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Table from '../styles/Table';
import Button from '../styles/Button';
import { getCookie } from '../../lib/session';
import { getCustomers, updatePermissions } from '../../services/api';
import { addPermission, removePermission } from '../../lib/permissions';

const possiblePermissions = [
  'admin',
  'user',
  'itemcreate',
  'itemupdate',
  'itemdelete',
  'permissionupdate'
];

class Permissions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: []
    };
  }
  
  componentDidMount = async () => {
    const token = getCookie('token');
    const req = await getCustomers(token);
    const customers = await req.json();
    this.setState({ customers: customers });
  }

  render() {
    const { customers } = this.state;
    return (
      <div>
        <h2>Manage Permissions</h2>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              {possiblePermissions.map(permission => <th key={permission}>{permission}</th>)}
              <th>Click</th>
            </tr>
          </thead>
          <tbody>{customers.map(customer => <CustomerPermissions customer={customer} key={customer.customer_id} />) }</tbody>
        </Table>
      </div>
    );
  }
}

class CustomerPermissions extends React.Component {
  static propTypes = {
    customer: PropTypes.shape({
      customer_id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
      permissions: PropTypes.string
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      permissions: this.props.customer.permissions
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    const checkbox = e.target;
    let updatedPermissions = [...this.state.permissions];
    if(checkbox.checked) {
      updatedPermissions = addPermission(this.state.permissions, checkbox.value);
    } else {
      updatedPermissions = removePermission(this.state.permissions, checkbox.value);
    }
    this.setState({ permissions: updatedPermissions });
  }

  handleUpdate = async (e) => {
    e.preventDefault();
    const token = getCookie('token');
    const req = await updatePermissions(this.state. permissions, this.props.customer.customer_id, token);
    const updated = await req.json();
    console.log(updated);
    Router.push('/');
  }

  render() {
    const { customer } = this.props;
    return (
      <>
        <tr>
          <td>{customer.name}</td>
          <td>{customer.email}</td>
          {possiblePermissions.map(permission => (
            <td key={permission}>
              <label htmlFor={`${customer.customer_id}-permission-${permission}`}>
                <input
                  id={`${customer.customer_id}-permission-${permission}`}
                  type="checkbox"
                  checked={this.state.permissions.includes(permission)}
                  value={permission}
                  onChange={this.handleChange}
                />
              </label>
            </td>
          ))}
          <td>
            <Button type="button" onClick={this.handleUpdate}>Update</Button>
          </td>
        </tr>
      </>
    );
  }
}

export default Permissions;