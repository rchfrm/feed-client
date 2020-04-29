import React from 'react'

// IMPORT COMPONENTS
import Main from './Main'
import TheHeader from './TheHeader'
import TheFooter from './TheFooter'

const AppContents = ({ children }) => {
  return (
    <div id="container">

      <TheHeader />

      <Main>
        {children}
      </Main>

      <TheFooter />

    </div>
  )
}


export default AppContents
