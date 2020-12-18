import React, {useEffect} from 'react'
import ReactGA from 'react-ga'

import Header from '../components/Header'
import Home from '../components/Home'
import Footer from '../components/Footer'

function App() {
  useEffect(() => {
    ReactGA.initialize('UA-178028561-3')
    ReactGA.pageview(window.location.pathname)
  })
  return (
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 1040,
        padding: `0 1.0875rem 1.45rem`,
      }}
    >
      <Header />
      <Home />
      <Footer />
    </div>
  )
}

export default App
