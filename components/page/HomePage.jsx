// IMPORT PACKAGES
import React from 'react'
import Router from 'next/router'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { NavigationContext } from '../contexts/Navigation'
import { UserContext } from '../contexts/User'
import { ArtistContext } from '../contexts/Artist'
// IMPORT ELEMENTS
import PageHeader from '../elements/PageHeader'
import Button from '../elements/Button'
import Spinner from '../elements/Spinner'
// IMPORT PAGES
import SummaryLoader from '../HomePageSummary'
import ChartLoader from '../HomePageChart'
// IMPORT ASSETS
// IMPORT CONSTANTS
import * as ROUTES from '../../constants/routes'
import brandColours from '../../constants/brandColours'
// IMPORT HELPERS
// IMPORT STYLES

function HomePage() {
// SHOW / HIDE NAVIGATION
  const { navState, navDispatch } = React.useContext(NavigationContext)
  const className = navState.visible ? 'hidden' : ''
  React.useEffect(() => {
    navDispatch({ type: 'hide' })
  }, [navDispatch])
  // END SHOW / HIDE NAVIGATION

  return (
    <div className={`page-container ${className}`}>

      <Loader />

    </div>
  )
}

export default HomePage

function Loader() {
// IMPORT CONTEXTS
  const { userLoading } = React.useContext(UserContext)
  const { artist, artistLoading } = React.useContext(ArtistContext)
  // END IMPORT CONTEXTS

  if (userLoading || artistLoading) {
    return <Spinner width={50} colour={brandColours.green.hex} />
  } if (artist === null) {
    // If there is no selected artist after the artist has finished loading,
    // show message to say the user needs to their artist pages
    return (
      <p>Please connect some artists</p>
    )
  }
  // Otherwise, show Home
  return <Home />
}

function Home() {
  const { user } = React.useContext(UserContext)

  return (
    <div className="page-container">

      <PageHeader heading={`Hey ${user.first_name}`} punctuation="," />

      <SummaryLoader />

      <ChartLoader />

      <PromotePostsButton />

    </div>
  )
}

export function PromotePostsButton() {
// DEFINE PROPS AS VARIABLES
  const { artist } = React.useContext(ArtistContext)
  const budget = artist.daily_budget
  const text = budget > 0 ? 'View results from posts' : 'Start promoting posts'
  const destination = budget > 0 ? 'RESULTS' : 'POSTS'
  // END DEFINE PROPS AS VARIABLES

  // HANDLE BUTTON CLICK
  const handleClick = e => {
    e.preventDefault()
    Router.push(ROUTES[destination])
  }
  // END HANDLE BUTTON CLICK

  return (
    <div className="ninety-wide">
      <Button
        version="black"
        width={100}
        onClick={handleClick}
      >
        {text}
      </Button>
    </div>
  )
}
