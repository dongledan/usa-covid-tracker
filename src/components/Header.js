import React, { Component } from 'react'
import { getCurrentUSACases, getCurrentWorldCases } from '../covid-tracking';
import { humanDateFormat, nearestHundredth } from './utils';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usa: {},
      world: {},
    }
  }

  componentDidMount() {
    try {
      this.getUSAData();
      this.getWorldData();
    } catch (error) {
      console.log(error);
    }
  }

  async getUSAData() {
    const { data } = await getCurrentUSACases();
    this.setState({usa: data});
  }

  async getWorldData() {
    const { data } = await getCurrentWorldCases();
    this.setState({world: data});
  }

  render() {
    const { usa, world } = this.state;
  
    return (
      <div className="header-container">
        <div className="header-title">Spread <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters" rel="noopener noreferrer" target="_blank"><span className="blue">FACTS</span></a>, Not <a href="https://gph.is/g/Zl1QdPK"  rel="noopener noreferrer" target="_blank"><span className="red">COVID</span></a>.</div>
        <div className="header-sub-container">
          <div className="header-subtitle">USA by the <span className="date">numbers:</span></div>
          <div className="header-data"><span className="number">{usa.cases}</span> people were infected.</div>
          <div className="header-data"><span className="number">{usa.deaths}</span> people have <div className="tooltip">died  <span class="tooltiptext"><span className="number">{nearestHundredth(usa.deaths / 2977)}x</span> more than 9/11 attacks. <br/><span className="number">{nearestHundredth(usa.deaths / 58220)}x</span> more than Vietnam War. <br/><span className="number">{nearestHundredth(usa.deaths / 116516)}x</span> more than WWI.</span></div>.</div>
          <div className="header-data"><span className="number">{nearestHundredth(usa.cases / world.cases) * 100}%</span> of its COVID cases but <span className="number">{nearestHundredth(usa.population / world.population) * 100 }%</span> of world population.</div>
          <div className="header-caption">Last updated on <span className="date">{humanDateFormat(usa.updated)}</span></div>
        </div>
      </div>
       
    )
  }
}

