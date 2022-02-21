import React from 'react'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'

import { formatCurrency } from '@/helpers/utils'

const getControlsStoreState = (state) => ({
  budget: state.budget,
})

const GetStartedSummarySentence = () => {
  const { artist } = React.useContext(ArtistContext)
  const { budget } = useControlsStore(getControlsStoreState)

  const { feedMinBudgetInfo: { currencyCode } } = artist

  return (
    <>
      <span className="whitespace-pre mb-2">with a daily budget of</span>
      <span className="border-2 border-solid border-green rounded-full py-1 px-3 mx-1 mb-2">{formatCurrency(budget, currencyCode)}</span>
    </>
  )
}

GetStartedSummarySentence.propTypes = {
}

GetStartedSummarySentence.defaultProps = {
}

export default GetStartedSummarySentence
