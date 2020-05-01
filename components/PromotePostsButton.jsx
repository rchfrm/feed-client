
// IMPORT PACKAGES
import React from 'react'
import Router from 'next/router'
// IMPORT CONTEXTS
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import Button from './elements/Button'
// IMPORT CONSTANTS
import * as ROUTES from '../constants/routes'

function PromotePostsButton() {
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
        style={{
          width: '100%',
        }}
        onClick={handleClick}
      >
        {text}
      </Button>
    </div>
  )
}

export default PromotePostsButton
