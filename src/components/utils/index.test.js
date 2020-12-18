import {humanDateFormat, pastDays, getSuggestions, states} from './index.js'
import expect from 'expect'

describe('humanDateFormat()', () => {
  it('converts milliseconds to readable date format', () => {
    expect(humanDateFormat(1607948896507)).toEqual('12/14/2020, 7:28:16 AM')
  })
})

describe('pastDays()', () => {
  it('returns an array with 12 days', () => {
    expect(pastDays().length).toEqual(12)
  })

  it('returns in a MM/DD/YY format or a total length of 8', () => {
    expect(pastDays()[0].length).toEqual(8)
  })
})

describe('getSuggestions()', () => {
  const values = 's'
  it('returns an array with suggested values', () => {
    expect(getSuggestions(values)).toEqual(['South Carolina', 'South Dakota'])
  })

  it('returns an empty array if value.length is empty', () => {
    expect(getSuggestions('')).toEqual([])
  })
})
