import axios from 'axios';

// API Calls

const headers = {
  'Content-Type': 'application/json',
};

// COVID-19 data sourced from Worldometers, updated every 10 minutes
export const getCurrentTracking = () => axios.get(`https://disease.sh/v3/covid-19/countries/USA?yesterday=true&twoDaysAgo=false&strict=true&allowNull=true
`, {headers});

export const getCurrentStateCases = (state) => axios.get(`https://disease.sh/v3/covid-19/states/${state}?yesterday=true&allowNull=true`, {headers});