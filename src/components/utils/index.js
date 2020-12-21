import React from 'react'
import {states} from './states'

export const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length
  return inputLength < 1
    ? []
    : states.filter(
        (state) => state.toLowerCase().slice(0, inputLength) === inputValue
      )
}

export const getSuggestionValue = (suggestion) => suggestion.toLowerCase()

export const renderSuggestion = (suggestion) => (
  <div className="suggestions">{suggestion}</div>
)

export const humanDateFormat = (milliseconds) => {
  const dateObject = new Date(milliseconds)
  return dateObject.toLocaleString()
}

export const pastDays = () => {
  const pastDays = []
  for (let i = 0; i < 12; i++) {
    let realDate = new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      month = '' + (realDate.getMonth() + 1),
      day = '' + realDate.getDate(),
      year = realDate.getFullYear().toString().substr(2, 2)
    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day
    let actualDate = [month, day, year].join('/')

    pastDays.push(actualDate)
  }
  return pastDays
}

export const color = (dailyRate) => {
  if (dailyRate > 75) return '#7F0000'
  else if (dailyRate <= 75 && dailyRate > 25) return '#c72f2b'
  else if (dailyRate <= 25 && dailyRate > 10) return '#ffa500'
  else if (dailyRate <= 10 && dailyRate > 1) return '#ffdb58'
  else if (dailyRate.toString() === '00') return ''
  else return '#4DD787'
}

export const nearestHundredth = (num) => Math.round(num * 100) / 100

export const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value)
}

export const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config)

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items]
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (sortConfig.key === 'population') {
          if (
            parseInt(a[sortConfig.key].replace(/,/g, '')) <
            parseInt(b[sortConfig.key].replace(/,/g, ''))
          ) {
            return sortConfig.direction === 'ascending' ? -1 : 1
          }
          if (
            parseInt(a[sortConfig.key].replace(/,/g, '')) >
            parseInt(b[sortConfig.key].replace(/,/g, ''))
          ) {
            return sortConfig.direction === 'ascending' ? 1 : -1
          }
        }
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortableItems.slice(0, 10)
  }, [items, sortConfig])

  const requestSort = (key) => {
    let direction = 'descending'
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'descending'
    )
      direction = 'ascending'
    setSortConfig({key, direction})
  }

  return {items: sortedItems, requestSort, sortConfig}
}

export const COLOR_MAP = {
  ORANGE: {
    BASE: '#F88722',
    LIGHT: '#FFC020',
    DARK: '#933500',
  },
  RED: {
    BASE: '#F03147',
    LIGHT: '#FC818F',
    DARK: '#82000E',
  },
  GREEN: {
    // Chosen to match "official" green from logo, etc.
    BASE: 'rgb(0, 208, 125)',
    // TODO: Remove GREEN.DARK? Per Josh Ziman we want to consolidate all
    // instances of green into one, as long as text readability is maintained.
    DARK: '#0A3D31',
  },
  BLUE: '#3BBCE6',
  GRAY: {
    BASE: '#CCCCCC',
    LIGHT: '#E3E3E3',
    DARK: '#999999',
  },
}

export {states}
