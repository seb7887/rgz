import React from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from '../styles/DropDown';
import { searchItems, getItem } from '../../services/api';
import { getCookie } from '../../lib/session';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: false
    };
  }

  handleChange = debounce(async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const res = await searchItems(e.target.value);
    const searchResult = await res.json();
    if (searchResult !== 'No items found') {
      this.setState({
      items: searchResult,
      loading: false
      });
    } else {
      this.setState({
        loading: false
      });
    }
  }, 350);

  getFromAPI = async (item) => {
    const token = getCookie('token');
    const req = await getItem(item.item_id, token);
    const data = await req.json();
    console.log(data);
    this.props.loadItem(data);
  }

  routeToItem = (item) => {
    this.getFromAPI(item);
    Router.push(`/item`);
  }

  render() {
    resetIdCounter();
    return (
      <SearchStyles>
        <Downshift 
          onChange={this.routeToItem}
          itemToString={item => (item === null ? '': item.title)}
        >
          {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
            <div>
              <div>
                <input
                  {...getInputProps({
                    type: "search",
                    placeholder: "Search for an item",
                    id: "search",
                    className: this.state.loading ? 'loading' : '',
                    onChange: e => {
                      e.persist();
                      this.handleChange(e);
                    }
                  })}
                />
              </div>
              { isOpen && (
                <DropDown>
                  {this.state.items.map((item, index) => (
                    <DropDownItem
                      {...getItemProps({ item })}
                      key={item.item_id}
                      highlighted={index === highlightedIndex}
                    >
                      <img width="50" src={item.image} alt={item.title} />
                      {item.title}
                    </DropDownItem>
                  ))}
                  {!this.state.items.length &&
                    !this.state.loading &&
                    <DropDownItem>Nothing Found {inputValue}</DropDownItem>
                  }
                </DropDown>
              )}
            </div>
          )}
        </Downshift>
      </SearchStyles>
    );
  }
}

export default Search;
