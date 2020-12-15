export const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength < 1 ? [] : states.filter(state =>
    state.toLowerCase().slice(0, inputLength) === inputValue
  );
};

export const getSuggestionValue = suggestion => suggestion.toLowerCase();

export const renderSuggestion = suggestion => (
  <div className="suggestions">
    {suggestion}
  </div>
);

export const humanDateFormat = (milliseconds) => {
  const dateObject = new Date(milliseconds);
  return dateObject.toLocaleString();
}

export const pastDays = () => {
  const pastDays = [];
  for (let i = 0; i < 5; i++) {
    let realDate = new Date(Date.now() - i * 24 * 60 * 60 * 1000),
    month = '' + (realDate.getMonth() + 1),
    day = '' + realDate.getDate(),
    year = realDate.getFullYear().toString().substr(2,2);
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    let actualDate = [month, day, year].join('/');

    pastDays.push(actualDate);
  }
  return pastDays;
}

export const nearestHundredth = (num) => Math.round(num * 100) / 100;

export const states =  [
  "Alabama",
  "Alaska",
  "American Samoa",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Florida",
  "Georgia",
  "Guam",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Northern Mariana Islands",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virgin Islands",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming"
];
