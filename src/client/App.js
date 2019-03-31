import React, { Component } from 'react';
import './app.css';
import LandingPage from './Pages/LandingPage';
import 'antd/dist/antd.css';

export default class App extends Component {
  state = {};

  render() {
    return (
      <div>
        <LandingPage />
      </div>
    );
  }
}
