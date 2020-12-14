import React, { Component } from 'react'
import { getCurrentTracking } from '../covid-tracking';

export default class Header extends Component {
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
      <div className="header-container">
        <div className="header-title">Spread <span className="green">FACTS</span>, Not <span className="red">COVID</span>.</div>
        <div className="header-subtitle">USA by the numbers:</div>
        <div className="header-data">A total of <span className="number">{current.positive}</span> were infected.</div>
        <div className="header-data"><span className="number">{current.death}</span> people have died.</div>
        <div className="header-caption">Last updated on {current.date}</div>
      </div>
    )
  }
}

