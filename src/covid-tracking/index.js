import axios from 'axios';

// API Calls

const headers = {
  'Content-Type': 'application/json',
};

export const getCurrentTracking = () => axios.get(`https://api.covidtracking.com/v1/us/current.json`, {headers});