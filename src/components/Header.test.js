import {render, screen} from '@testing-library/react'
import ReactDOM from 'react-dom'
import Header from './Header'

test('renders some Header text', () => {
  render(<Header />)
  const headerElement = screen.getByText(/usa by the numbers/i)
  expect(headerElement).toBeInTheDocument()
})

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Header />, div)
})
