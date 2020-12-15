import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

import { getCurrentStateCases, getCurrentCountyCases } from '../covid-tracking';
import { getSuggestionValue, getSuggestions, renderSuggestion, pastDays } from './utils';
import search from '../images/search-icon.png';

import Table from './Table';

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
      botTen: []
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
    this.setState({currentState: data});
  }

  async getCountyData() {
    const { value } = this.state;
    const days = pastDays();
    const { data } = await getCurrentCountyCases(value);
    let day = '';
    let prevDay = '';
    for (let i = 0; i < days.length; i++) {
      const currDay = days[i];
      if (data[0].timeline.cases[currDay]) {
        day = currDay;
        prevDay = days[i + 1];
        break;
      }
    }
    const sortedData = data.sort((a,b) => (
      (b.timeline.cases[day] - b.timeline.cases[prevDay]) - (a.timeline.cases[day] - a.timeline.cases[prevDay])
    ))

    this.setState({currentCounty:  sortedData, timelineDay: day, prevTimelineDay: prevDay })
  }

  render() {
    const { value, currentState, suggestions, currentCounty, timelineDay, prevTimelineDay } = this.state;
    const topTen = currentCounty.slice(0, 10);
    const botTen = currentCounty.slice(-10).reverse();
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
              <div className="state-data">Today in <span className="blue">{currentState.state}</span>, there have been <span className="number">{currentState.todayCases}</span> new cases and <span className="number">{currentState.todayDeaths}</span> more deaths. There have been a total of <span className="number">{currentState.cases}</span> cases and <span className="number">{currentState.deaths}</span> deaths. Last updated on {timelineDay}.</div>
            </div>
          : 
            <span />
        }
        {currentCounty.length
        ?
          <Table day={timelineDay} prevDay={prevTimelineDay} botTen={botTen} topTen={topTen}/>
        :
          <span />
        }
      </div>
    )
  }
}
