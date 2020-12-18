import {render, screen} from '@testing-library/react'
import ReactDOM from 'react-dom'
import Footer from './Footer'

test('renders some footer text', () => {
  render(<Footer />)
  const footerElement = screen.getByText(/please wear a/i)
  expect(footerElement).toBeInTheDocument()
})

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Footer />, div)
})
