import React, { Component } from 'react';
import { getCurrentTracking } from '../covid-tracking';
import search from '../images/search-icon.png'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: {}
    }
  }

  componentDidMount() {
    try {
      this.getData();
    } catch (error) {
      console.log(error);
    }
  }

  async getData() {
    const { data } = await getCurrentTracking();
    this.setState({current: data[0]});
  }
  render() {
    const { current } = this.state;
    return (
      <div>
        <div className="input">
          <img className="search-icon" src={search}/>
          <input placeholder="Search for your state or county" />

        </div>
      </div>
    )
  }
}
