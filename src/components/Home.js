import React, {Component} from 'react'
import Autosuggest from 'react-autosuggest'

import {
  getCurrentStateCases,
  getCurrentCountyCases,
  getCountyPopulation,
  getCovidNews,
} from '../covid-tracking'
import {
  getSuggestionValue,
  getSuggestions,
  renderSuggestion,
  pastDays,
  states,
  nearestHundredth,
} from './utils'
import search from '../images/search-icon.png'

import Table from './Table'

const lowerCaseStates = states.map((state) => state.toLowerCase())

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentState: {},
      currentCounty: [],
      timelineDay: '',
      prevTimelineWeek: '',
      prevTimelineDay: '',
      value: '',
      suggestions: [],
      topTen: [],
      botTen: [],
      isLoading: true,
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange = (event, {newValue}) => {
    this.setState({
      value: newValue,
    })
  }

  onSuggestionsFetchRequested = ({value}) => {
    this.setState({
      suggestions: getSuggestions(value),
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  }

  async getData() {
    const {value} = this.state
    const {data} = await getCurrentStateCases(value)
    this.setState({currentState: data, isLoading: true, currentCounty: [0]})
  }

  async getCountyData() {
    const {value} = this.state // user input
    const days = pastDays() // returns array of past week
    const {data} = await getCurrentCountyCases(value)
    let pop = await this.getCountyPop()
    const filteredData = pop.feed.entry.filter((name, i) => {
      let state = name.content.$t.split(' ')
      let inputState = value.split(' ')
      let prev = i > 0 ? pop.feed.entry[i - 1].content.$t.split(' ') : ''
      // accounting for states with more than one word
      if ((inputState.length > 1 && state.length > 3) || prev.length > 3) {
        state = state[state.length - 2] + ' ' + state[state.length - 1]
        inputState = inputState.join(' ')
        prev = prev[prev.length - 2] + ' ' + prev[prev.length - 1]
        return state === inputState || prev === inputState
      }
      return (
        state[state.length - 1] === inputState[inputState.length - 1] ||
        prev[prev.length - 1] === inputState[inputState.length - 1]
      )
    })
    /** CHECK FILTEREDDATA **/
    // [ ".Test", "County,", "State" ] Adding population to data
    for (let i = 0; i < data.length; i++) {
      const entry = data[i].county.split(' ')

      for (let j = i; j < filteredData.length; j++) {
        const censusEntry = filteredData[j].content.$t.split(' ')
        if (j % 2 === 1) continue
        else if (
          censusEntry[0] > entry[0] &&
          censusEntry[0] !== 'st.' &&
          censusEntry[0].slice(0, 2) !== 'mc'
        ) {
          continue
        } else if (censusEntry[0] === entry[0]) {
          // 'san', 'angeles', 'county', 'california vs 'orange', 'county', 'new york' // possible multiple 'los'
          if (entry.length > 1) {
            if (censusEntry[1] === entry[1])
              data[i]['population'] = filteredData[j + 1].content.$t
            else continue
          } else data[i]['population'] = filteredData[j + 1].content.$t
          break
        } else data[i]['population'] = '00'
      }
    }

    let day = ''
    let prevWeek = ''
    let prevDay = ''
    // API data can be stale and checking the past 5 days; finding which days are available in data.timeline.cases[ie '12/25/20'] then getting previous day to perform current cases
    for (let i = 0; i < days.length; i++) {
      const currDay = days[i]
      if (data[0].timeline.cases[currDay]) {
        day = currDay
        prevWeek = days[i + 6]
        prevDay = days[i + 1]
        break
      }
    }
    for (let i = 0; i < data.length; i++) {
      const county = data[i]
      const dailyRate = nearestHundredth(
        ((county.timeline.cases[day] - county.timeline.cases[prevWeek]) /
          7 /
          parseInt(county.population.replace(/,/g, ''))) *
          100000
      )
      const dailyCases =
        county.timeline.cases[day] - county.timeline.cases[prevDay]
      const dailyDeaths =
        county.timeline.deaths[day] - county.timeline.deaths[prevDay]
      county['dailyRate'] = dailyRate.toString() !== 'NaN' ? dailyRate : '00'
      county['dailyCases'] = dailyCases
      county['dailyDeaths'] = dailyDeaths
    }
    // sorting by most daily cases data.time.cases[12/25/20] - data.time.cases[12/24/20]
    // sorting by (cases / pop) * 100,000
    const sortedData = data.sort(
      (a, b) =>
        ((b.timeline.cases[day] - b.timeline.cases[prevWeek]) /
          7 /
          parseInt(b.population.replace(/,/g, ''))) *
          100000 -
        ((a.timeline.cases[day] - a.timeline.cases[prevWeek]) /
          7 /
          parseInt(a.population.replace(/,/g, ''))) *
          100000
    )
    // if state exist, then setState
    if (lowerCaseStates.lastIndexOf(value) >= 0) {
      this.setState({
        currentCounty: sortedData,
        timelineDay: day,
        prevTimelineDay: prevDay,
        prevTimelineWeek: prevWeek,
        isLoading: false,
      })
    }
  }

  async getCountyPop() {
    const {data} = await getCountyPopulation()

    // data.feed.entry[1].content.$t = county name 'county', st
    // data.feed.entry[2].content.$t = county pop

    return data
  }

  async getCovidNews() {
    const {data} = await getCovidNews()
    return data
  }

  render() {
    const {
      value,
      currentState,
      suggestions,
      currentCounty,
      timelineDay,
      prevTimelineDay,
      isLoading,
      prevTimelineWeek,
    } = this.state
    const topDaily = currentCounty

    const inputProps = {
      placeholder: 'Search for your state',
      value,
      onChange: this.onChange,
    }
    return (
      <div className="home-container">
        <div className="input-container">
          <div className="input">
            <img
              className="search-icon"
              src={search}
              alt="magnifying glass acting as search icon"
            />
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
          </div>
          <button
            onClick={() => {
              this.getData()
              this.getCountyData()
              this.getCountyPop()
            }}
          >
            Submit
          </button>
        </div>
        {currentState.state ? (
          <div className="data-container">
            <div className="state-data">
              Earlier in <span className="blue">{currentState.state}</span>,
              there have been{' '}
              <span className="number">{currentState.todayCases}</span> new
              cases and{' '}
              <span className="number">{currentState.todayDeaths}</span> more
              deaths. There have been a total of{' '}
              <span className="number">{currentState.cases}</span> cases and{' '}
              <span className="number">{currentState.deaths}</span> deaths.{' '}
              <span className="date">
                {isLoading ? '' : `Last updated on ${timelineDay}.`}
              </span>
            </div>
          </div>
        ) : (
          <span />
        )}
        {currentCounty.length ? (
          <Table
            day={timelineDay}
            prevDay={prevTimelineDay}
            prevWeek={prevTimelineWeek}
            topDaily={topDaily}
            isLoading={isLoading}
          />
        ) : (
          <span />
        )}
      </div>
    )
  }
}
