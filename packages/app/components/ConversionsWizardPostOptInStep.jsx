import React from 'react'
import Router from 'next/router'

import * as ROUTES from '@/app/constants/routes'

import { enableConversions } from '@/app/helpers/conversionsHelpers'

import Button from '@/elements/Button'
import Error from '@/elements/Error'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import brandColors from '@/constants/brandColors'

const ConversionsWizardOptInStep = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const { artist: { id: artistId } } = React.useContext(ArtistContext)

  const updateConversions = async () => {
    setIsLoading(true)
    const { res, error } = await enableConversions(artistId)
    setIsLoading(false)

    if (error) {
      setError({ message: error.message })
      return
    }
    Router.push(ROUTES.HOME)
  }

  return (
    <>
      <h2>Get going</h2>
      <p>All set! Only thing left is to select which posts you’d like to use for conversion campaigns from the posts page. Once opted-in Feed will create ads straight away.</p>
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
