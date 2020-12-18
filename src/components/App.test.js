import {render, screen} from '@testing-library/react'
import ReactDOM from 'react-dom'
import App from './App'

test('renders FACTS link', () => {
  render(<App />)
  const linkElement = screen.getByText(/FACTS/i)
  expect(linkElement).toBeInTheDocument()
})

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})
