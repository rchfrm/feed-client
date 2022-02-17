import React from 'react'
// import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'

import { getArtistIntegrationByPlatform } from '@/app/helpers/artistHelpers'
import { capitalise, formatCurrency } from '@/helpers/utils'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
  budget: state.budget,
})

const GetStartedSummarySentence = () => {
  const { artist } = React.useContext(ArtistContext)
  const { optimizationPreferences, budget } = useControlsStore(getControlsStoreState)
  const { objective, platform } = optimizationPreferences

  const { feedMinBudgetInfo: { currencyCode } } = artist

  const facebookIntegration = getArtistIntegrationByPlatform(artist, 'facebook')
  const adAccountId = facebookIntegration?.adaccount_id

  return (
    <div className="flex flex-wrap items-center mr-auto sm:mr-0 mb-10">
      <span className="border-2 border-solid border-red rounded-full py-1 px-3 mr-1 mb-2 whitespace-pre">{capitalise(platform)} {objective}</span>
      <span className="whitespace-pre mb-2">using these posts:</span>
      <div className="flex items-center inline whitespace-pre">
        <span className="inline-block w-8 h-8 mx-1 rounded-full bg-black mb-2" />
        <span className="inline-block w-8 h-8 mx-1 rounded-full bg-black mb-2" />
      </div>
      <span className="whitespace-pre mb-2">, in</span>
      <span className="border-2 border-solid border-yellow rounded-full py-1 px-3 mx-1 mb-2">{adAccountId}</span>
      <span className="whitespace-pre mb-2">with a daily budget of</span>
      <span className="border-2 border-solid border-green rounded-full py-1 px-3 mx-1 mb-2">{formatCurrency(budget, currencyCode)}</span>
    </div>
  )
}

GetStartedSummarySentence.propTypes = {
}

GetStartedSummarySentence.defaultProps = {
}

export default GetStartedSummarySentence
