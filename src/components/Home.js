import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

import { getCurrentStateCases, getCurrentCountyCases } from '../covid-tracking';
import { getSuggestionValue, getSuggestions, renderSuggestion, pastDays, states } from './utils';
import search from '../images/search-icon.png';

import Table from './Table';

const lowerCaseStates = states.map((state) => state.toLowerCase())

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentState: {},
      currentCounty: [],
      timelineDay: '',
      prevTimelineDay: '',
      value: '',
      suggestions: [],
      topTen: [],
      botTen: [],
      isLoading: true
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  }

  async getData() {
    const { value } = this.state;
    const { data } = await getCurrentStateCases(value);
    this.setState({currentState: data, isLoading: true, currentCounty: [0]});
  }

  async getCountyData() {
    const { value } = this.state;
    const days = pastDays();
    const { data } = await getCurrentCountyCases(value);
    let day = '';
    let prevDay = '';
    // API data can be stale and checking the past 5 days; finding which days are available in data.timeline.cases[ie '12/25/20'] then getting previous day to perform current cases
    for (let i = 0; i < days.length; i++) {
      const currDay = days[i];
      if (data[0].timeline.cases[currDay]) {
        day = currDay;
        prevDay = days[i + 1];
        break;
      }
    }

    // sorting by most daily cases data.time.cases[12/25/20] - data.time.cases[12/24/20]
    const sortedData = data.sort((a,b) => (
      (b.timeline.cases[day] - b.timeline.cases[prevDay]) - (a.timeline.cases[day] - a.timeline.cases[prevDay])
    ))
    // if state exist, then setState
    if (lowerCaseStates.lastIndexOf(value) >= 0) {
      this.setState({currentCounty: sortedData, timelineDay: day, prevTimelineDay: prevDay, isLoading: false })
    }
  }

  render() {
    const { value, currentState, suggestions, currentCounty, timelineDay, prevTimelineDay, isLoading } = this.state;
    const topDaily = currentCounty.slice(0, 15);
    const botDaily = currentCounty.slice(-15).reverse(); 
    const inputProps = {
      placeholder: 'Search for your state',
      value,
      onChange: this.onChange,
    };
    return (
      <div className="home-container">
        <div className="input-container">
          <div className="input">
            <img className="search-icon" src={search} alt="magnifying glass acting as search icon" />
            <Autosuggest  
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
          </div>
          <button onClick={() => {this.getData(); this.getCountyData()}}>Submit</button>
        </div>
        {
          currentState.state ? 
            <div className="data-container">
              <div className="state-data">Earlier in <span className="blue">{currentState.state}</span>, there have been <span className="number">{currentState.todayCases}</span> new cases and <span className="number">{currentState.todayDeaths}</span> more deaths. There have been a total of <span className="number">{currentState.cases}</span> cases and <span className="number">{currentState.deaths}</span> deaths. <span className="date">{isLoading ? '' : `Last updated on ${timelineDay}.`}</span></div>
            </div>
          : 
            <span />
        }
        {
          currentCounty.length ?
            <Table day={timelineDay} prevDay={prevTimelineDay} botDaily={botDaily} topDaily={topDaily} isLoading={isLoading}/>
          :
            <span />
        }
      </div>
    )
  }
}
