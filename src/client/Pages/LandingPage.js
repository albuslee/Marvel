import React from 'react';
import { Layout } from 'antd';
import NavBar from '../Components/NavBar';
import MarvelCardsContainer from '../Containers/MarvelCardsContainer';

const { Content, Footer } = Layout;

const LandingPage = () => (
  <div>
    <Layout className="layout">
      <NavBar />
      <Content style={{ padding: '0 50px' }}>
        <MarvelCardsContainer />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </div>
);

export default LandingPage;
