/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Select } from 'antd';

const { Option } = Select;

export default class Sort extends Component {
  state = {};

  render() {
    const { onUserSelect } = this.props;
    return (
      <div>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Sort"
          allowClear
          optionFilterProp="children"
          onChange={onUserSelect}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="idA">ID Asc</Option>
          <Option value="idD">ID Desc</Option>
          <Option value="titleA">Title A-Z</Option>
          <Option value="titleZ">Title Z-A</Option>
        </Select>
      </div>
    );
  }
}
