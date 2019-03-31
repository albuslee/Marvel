/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import SearchBar from '../Components/SearchBar';
import MarvelCard from '../Components/MarvelCard';
import PaginationComponent from '../Components/PaginationComponent';
import Sort from '../Components/Sort';

export default class MarvelCardsContainer extends Component {
  state = {
    data: null,
    filteredData: null,
    loading: true,
    total: 0,
    current: 1
  };

  async componentDidMount() {
    try {
      const getComicsList = await fetch('/api/getComicsList');
      if (!getComicsList.ok) {
        throw Error(getComicsList.statusText);
      }
      const handleResponseDataToJson = await getComicsList.json();
      const jsonData = handleResponseDataToJson.data.results;
      console.log(jsonData);
      // write the calulation for pages
      this.setState({
        data: jsonData,
        loading: false,
        total: jsonData.length,
        filteredData: jsonData
      });
    } catch (error) {
      console.log(error);
    }
  }

  getFilterResult = (filterText) => {
    const { data } = this.state;
    const tempData = [];
    const re = new RegExp(filterText, 'i');
    data.forEach((ele) => {
      if (ele.title.search(re) !== -1) {
        tempData.push(ele);
      }
    });
    this.setState({ filteredData: tempData, total: tempData.length });
  };

  handlePage = (currentPage) => {
    this.setState({ current: currentPage });
  };

  handleUserInput = (filterText) => {
    this.getFilterResult(filterText);
  };

  handleSort = (option) => {
    const { data } = this.state;
    switch (option) {
      case 'idA': {
        const compare = (a, b) => {
          if (Number(a.id) > Number(b.id)) {
            return 1;
          }
          if (Number(a.id) < Number(b.id)) {
            return -1;
          }
          return 0;
        };
        this.setState({
          filteredData: data.sort(compare)
        });
        break;
      }
      case 'idD': {
        const compare = (a, b) => {
          if (Number(a.id) > Number(b.id)) {
            return -1;
          }
          if (Number(a.id) < Number(b.id)) {
            return 1;
          }
          return 0;
        };
        this.setState({
          filteredData: data.sort(compare)
        });
        break;
      }
      case 'titleA': {
        const compare = (a, b) => {
          if (a.title > b.title) {
            return 1;
          }
          if (a.title < b.title) {
            return -1;
          }
          return 0;
        };
        this.setState({
          filteredData: data.sort(compare)
        });
        break;
      }
      case 'titleZ': {
        const compare = (a, b) => {
          if (a.title > b.title) {
            return -1;
          }
          if (a.title < b.title) {
            return 1;
          }
          return 0;
        };
        this.setState({
          filteredData: data.sort(compare)
        });
        break;
      }
      default:
        this.setState({ filteredData: data });
    }
  };

  render() {
    const {
      filteredData, loading, total, current
    } = this.state;
    if (loading === false) {
      const content = line => filteredData.slice(4 * (line - 1), 4 * line).map((comic, index) => (
        <Col key={index} span={6}>
          <MarvelCard
            key={comic.id}
            title={comic.title}
            description={comic.description}
            thumbnail={comic.thumbnail}
          />
        </Col>
      ));
      return (
        <div>
          {/* SearchBar Component */}
          <SearchBar onUserInput={this.handleUserInput} />
          {/* Sort Function */}
          <Sort onUserSelect={this.handleSort} />
          <br />
          {/* Cards Rendered  */}
          <Row gutter={24}>{content(current * 2 - 1)}</Row>
          <br />
          <Row gutter={24}>{content(current * 2)}</Row>
          {/* Pagination  */}
          <PaginationComponent total={total} onUserClick={this.handlePage} />
        </div>
      );
    }
    return (
      <div>
        <h2>loading...</h2>
      </div>
    );
  }
}
