import React from 'react'
import Router from 'next/router'

import * as ROUTES from '@/app/constants/routes'

import { enableConversions } from '@/app/helpers/conversionsHelpers'

import Button from '@/elements/Button'
import Error from '@/elements/Error'
import MarkdownText from '@/elements/MarkdownText'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import copy from '@/app/copy/controlsPageCopy'

import brandColors from '@/constants/brandColors'

const ConversionsWizardOptInStep = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const { artist: { id: artistId } } = React.useContext(ArtistContext)

  // Handle API request and navigate to the posts page
  const updateConversions = async () => {
    setIsLoading(true)
    const { res, error } = await enableConversions(artistId)
    setIsLoading(false)

    if (error) {
      setError({ message: error.message })
      return
    }
    Router.push({
      pathname: ROUTES.HOME,
      query: { postStatus: 'not-run' },
    })
  }

  return (
    <>
      <h2>Get going</h2>
      <MarkdownText markdown={copy.postOptInStepDescription} />
      <Error error={error} />
      <Button
        version="green icon"
        onClick={updateConversions}
        loading={isLoading}
        className="w-full"
      >
        Opt in posts
        <ArrowAltIcon
          className="ml-3"
          fill={brandColors.white}
          direction="right"
        />
      </Button>
    </>
  )
}

export default ConversionsWizardOptInStep
