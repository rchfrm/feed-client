
// IMPORT PACKAGES
import React from 'react'
import Router from 'next/router'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { NavigationContext } from '../contexts/Navigation'
// IMPORT ELEMENTS
import PageHeader from '../PageHeader'
import Button from '../elements/Button'
import Feed from '../elements/Feed'
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
import * as ROUTES from '../../constants/routes'
// IMPORT HELPERS
// IMPORT STYLES

function ThankYou() {
// SHOW / HIDE NAVIGATION
  const { navState, navDispatch } = React.useContext(NavigationContext)
  const className = navState.visible ? 'hidden' : ''
  React.useEffect(() => {
    navDispatch({ type: 'hide' })
  }, [navDispatch])
  // END SHOW / HIDE NAVIGATION

  const handleClick = e => {
    e.preventDefault()
    Router.push(ROUTES.HOME)
  }

  return (
    <div className={`page--container ${className}`}>

      <PageHeader heading="We're all set" punctuation="!" />

      <div className="fill-height ninety-wide" style={{ justifyContent: 'initial' }}>

        <p>
          Thanks so much for signing up to&nbsp;
          <Feed />
          .
        </p>

        <p>On the next screen, you'll see an overview of the information we've been able to find about you so far, as well as some recommendations on what to do next.</p>

        <p>Let's get started.</p>

      </div>

      <div className="ninety-wide" style={{ textAlign: 'right' }}>
        <Button version="black" onClick={handleClick}>done.</Button>
      </div>

    </div>

  )
}

export default ThankYou
