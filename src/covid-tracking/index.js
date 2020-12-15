import axios from 'axios';

// API Calls

const headers = {
  'Content-Type': 'application/json',
};

// data sourced from Worldometers, updated every 10 minutes
export const getCurrentUSACases = () => axios.get(`https://disease.sh/v3/covid-19/countries/USA?yesterday=true&twoDaysAgo=false&strict=true&allowNull=0`, {headers});

export const getCurrentWorldCases = () => axios.get(`https://disease.sh/v3/covid-19/all?yesterday=true&twoDaysAgo=true&allowNull=true`, {headers});

export const getCurrentStateCases = (state) => axios.get(`https://disease.sh/v3/covid-19/states/${state}?yesterday=true&allowNull=0`, {headers});


// data sourced from Johns Hopkins University, updated every 10 minutes
export const getCurrentCountyCases = (state) => axios.get(`https://disease.sh/v3/covid-19/historical/usacounties/${state}?lastdays=2`, {headers});
