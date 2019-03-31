import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import MarvelLogo from '../../../public/MarvelLogo.svg';

const { Header } = Layout;

export default class NavBar extends Component {
  state = {};

  render() {
    return (
      <div>
        <Header>
          <div className="logo">
            <img className="logo" src={MarvelLogo} alt="marvellogo" />
          </div>
          <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }} />
        </Header>
      </div>
    );
  }
}
