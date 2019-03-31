/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Card } from 'antd';

const { Meta } = Card;

export default class MarvelCard extends Component {
  state = {};

  render() {
    const { title, description, thumbnail } = this.props;
    return (
      <div>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src={`${thumbnail.path}.${thumbnail.extension}`} />}
        >
          <Meta title={title} description={description || title} />
        </Card>
      </div>
    );
  }
}
