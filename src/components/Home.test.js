import {render, screen} from '@testing-library/react'
import expect from 'expect'
import {shallow} from 'enzyme'
import ReactDOM from 'react-dom'
import Home from './Home'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Home />, div)
})

// describe('<Button />', () => {
//   it('renders a <button>', () => {
//     const renderedComponent = shallow(
//       <Home><button/></Home>
//     );
//     expect(
//       renderedComponent.find("button").node
//     ).toExist();
//   });
// });
