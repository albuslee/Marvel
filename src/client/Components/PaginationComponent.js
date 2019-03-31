/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Pagination } from 'antd';

export default class PaginationComponent extends Component {
  state = { current: 1 };

  render() {
    const { current } = this.state;
    const { total, onUserClick } = this.props;
    return (
      <div>
        <Pagination defaultCurrent={current} pageSize={8} total={total} onChange={onUserClick} />
      </div>
    );
  }
}
