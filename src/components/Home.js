import React, { Component } from 'react';
import { getCurrentStateCases } from '../covid-tracking';
import search from '../images/search-icon.png'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentState: {},
      value: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    event.preventDefault();
  }

  async getData() {
    const { value } = this.state;
    const { data } = await getCurrentStateCases(value);
    this.setState({currentState: data});
  }
  render() {
    const { value, currentState } = this.state;
    return (
      <div className="home-container">
        <div className="input">
          <img className="search-icon" src={search}/>
          <input placeholder="Search for your state or county" value={value} type="text" onChange={this.handleChange}/>
          <button onClick={() => this.getData()}>Submit</button>
        </div>
        {
          currentState.state ? 
            <div className="data-container">
              <div className="state-data">Today in <span className="blue">{currentState.state}</span>, there have been <span className="number">{currentState.todayCases}</span> new cases and <span className="number">{currentState.todayDeaths}</span> more deaths. There have been a total of <span className="number">{currentState.cases}</span> cases and <span className="number">{currentState.deaths}</span> deaths.</div>
            </div>
          : 
            <span />
        }
      </div>
    )
  }
}
