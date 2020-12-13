import React, { Component } from 'react';
import { getCurrentTracking } from '../covid-tracking';

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
        <div>{current.death}</div>
        <div>{current.positive}</div>
      </div>
    )
  }
}
