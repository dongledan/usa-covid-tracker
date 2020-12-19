import React, {useEffect} from 'react'
import ReactGA from 'react-ga'

import Header from '../components/Header'
import Home from '../components/Home'
import Footer from '../components/Footer'

function App() {
  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_UA_ID)
    ReactGA.pageview(window.location.pathname)
  })
  return (
    <div>
      <Header />
      <Home />
      <Footer />
    </div>
  )
}

export default App
