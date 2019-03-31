/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Input } from 'antd';

const { Search } = Input;
export default class SearchBar extends Component {
  state = {};

  render() {
    const { onUserInput } = this.props;
    return (
      <div>
        <Search placeholder="Enter title of comics..." onSearch={onUserInput} enterButton />
      </div>
    );
  }
}
