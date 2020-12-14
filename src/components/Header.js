import React, { Component } from 'react'
import { getCurrentTracking } from '../covid-tracking';
import { humanDateFormat } from './utils'

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
    this.setState({current: data});
  }
  render() {
    const { current } = this.state;
    return (
      <div className="header-container">
        <div className="header-title">Spread <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters" rel="noopener noreferrer" target="_blank"><span className="blue">FACTS</span></a>, Not <a href="https://gph.is/g/Zl1QdPK"  rel="noopener noreferrer" target="_blank"><span className="red">COVID</span></a>.</div>
        <div className="header-sub-container">
          <div className="header-subtitle">USA by the numbers:</div>
          <div className="header-data">A total of <span className="number">{current.cases}</span> were infected.</div>
          <div className="header-data"><span className="number">{current.deaths}</span> people have died.</div>
          <div className="header-caption">Last updated on {humanDateFormat(current.updated)}</div>
        </div>
      </div>
       
    )
  }
}

