import React from 'react'
import Router from 'next/router'
// import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'

import Button from '@/elements/Button'

import { getArtistIntegrationByPlatform } from '@/app/helpers/artistHelpers'
import { capitalise } from '@/helpers/utils'

import * as ROUTES from '@/app/constants/routes'
import copy from '@/app/copy/getStartedCopy'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
  budget: state.budget,
})

const GetStartedReview = () => {
  const { artist } = React.useContext(ArtistContext)
  const { optimizationPreferences, budget } = useControlsStore(getControlsStoreState)
  const { objective, platform } = optimizationPreferences

  const facebookIntegration = getArtistIntegrationByPlatform(artist, 'facebook')
  const adAccountId = facebookIntegration?.adaccount_id

  const goToPostsPage = () => {
    Router.push({
      pathname: ROUTES.HOME,
      query: { postStatus: 'not-run' },
    })
  }

  return (
    <div className="flex flex-1 flex-column justify-center items-center">
      <h3 className="mr-auto sm:mr-0 mb-10 font-medium text-xl">{copy.reviewDescription}</h3>
      <p className="mr-auto sm:mr-0 mb-10">{capitalise(platform)} {objective} using these posts: , in {adAccountId} with a daily budget of {budget}</p>
      <Button
        version="outline-green"
        onClick={goToPostsPage}
        className="w-full sm:w-48 mb-5 sm:mb-0"
        trackComponentName="GetStartedAdPreviewStep"
      >
        <span className="text-2xl" role="img" aria-label="raising hands">🙌</span>
      </Button>
    </div>
  )
}

GetStartedReview.propTypes = {
}

GetStartedReview.defaultProps = {
}

export default GetStartedReview
