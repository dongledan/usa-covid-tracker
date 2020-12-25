import axios from 'axios'

// API Calls

const headers = {
  'Content-Type': 'application/json',
}

// data sourced from Worldometers, updated every 10 minutes
export const getCurrentUSACases = () =>
  axios.get(
    `https://disease.sh/v3/covid-19/countries/USA?yesterday=true&twoDaysAgo=false&strict=true&allowNull=0`,
    {headers}
  )

export const getCurrentWorldCases = () =>
  axios.get(
    `https://disease.sh/v3/covid-19/all?yesterday=true&twoDaysAgo=true&allowNull=true`,
    {headers}
  )

export const getCurrentStateCases = (state) =>
  axios.get(
    `https://disease.sh/v3/covid-19/states/${state}?yesterday=true&allowNull=0`,
    {headers}
  )

// data sourced from Johns Hopkins University, updated every 10 minutes
export const getCurrentCountyCases = (state) =>
  axios.get(
    `https://disease.sh/v3/covid-19/historical/usacounties/${state}?lastdays=7`,
    {headers}
  )

// county population taken from US census exported to google sheets
export const getCountyPopulation = () =>
  axios.get(
    `https://spreadsheets.google.com/feeds/cells/1OOg_v8No2ZLqOJi8SB2YNjeBoRyoB8O2MuNRafTvOfI/1/public/full?alt=json`,
    {headers}
  )

// current USA news on COVID
export const getCovidNews = () =>
  axios.get(`https://api.covidnow.com/v1/news/usa`, {headers})
