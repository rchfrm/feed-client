// IMPORT PACKAGES
import React from 'react'
import Router from 'next/router'
// IMPORT CONTEXTS
// IMPORT ELEMENTS
import Button from '@/elements/Button'
// IMPORT CONSTANTS
import * as ROUTES from '@/app/constants/routes'

function PromotePostsButton({
  artist,
  artistId,
  className,
}) {
  // DEFINE BUTTON TEXT AND DESTINATION
  const [linkText, setLinkText] = React.useState('')
  const [linkDestination, setLinkDestination] = React.useState('')
  React.useEffect(() => {
    const budget = artist.daily_budget
    const text = budget > 0 ? 'View results from posts' : 'Start promoting posts'
    const destination = budget > 0 ? 'RESULTS' : 'POSTS'
    setLinkText(text)
    setLinkDestination(destination)
  }, [artistId, artist.daily_budget])

  // HANDLE BUTTON CLICK
  const handleClick = (e) => {
    e.preventDefault()
    // eslint-disable-next-line
    Router.push(ROUTES[linkDestination])
  }

  return (
    <div className={[className].join(' ')}>
      <Button
        version="black full"
        onClick={handleClick}
        trackComponentName="PromotePostsButton"
      >
        {linkText}
      </Button>
    </div>
  )
}

export default PromotePostsButton
