import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

import { getCurrentStateCases } from '../covid-tracking';
import { getSuggestionValue, getSuggestions, renderSuggestion } from './utils';
import search from '../images/search-icon.png';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentState: {},
      value: '',
      suggestions: []
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
  render() {
    const { value, currentState, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Search for your state',
      value,
      onChange: this.onChange,
      onClick: () => this.getData()
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
