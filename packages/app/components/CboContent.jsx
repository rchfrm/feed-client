import React from 'react'
// import PropTypes from 'prop-types'

import produce from 'immer'

import CboAgeSlider from '@/app/CboAgeSlider'
import CboBudgetSlider from '@/app/CboBudgetSlider'
import CboSummary from '@/app/CboSummary'

import { ArtistContext } from '@/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'

import { demoCboState } from '@/app/helpers/cboHelpers'


const CboContent = () => {
  // STOP GLOBAL LOADING WHEN ARTIST IS READY
  const { artistId } = React.useContext(ArtistContext)
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
  React.useEffect(() => {
    if (artistId) toggleGlobalLoading(false)
  }, [artistId, toggleGlobalLoading])
  // FETCH DATA FROM CONTEXT
  const {
    cboState,
    setCboState,
    saveCampaignSettings,
    currentView,
    setCurrentView,
    selectedCampaignType,
    saving,
  } = React.useContext(CboContext)
  // CBO STATE
  const [cboState, setCboState] = React.useState(demoCboState)

  return (
    <div>
      <CboSummary cboState={cboState} />
      {/* AGE SLIDER */}
      <CboAgeSlider
        minAge={cboState.minAge}
        maxAge={cboState.maxAge}
        onChange={([minAge, maxAge]) => {
          setCboState((cboState) => {
            return produce(cboState, draftState => {
              draftState.minAge = minAge
              draftState.maxAge = maxAge
            })
          })
        }}
      />
      {/* BUDGET SLIDER */}
      <CboBudgetSlider
        budget={cboState.budget}
        minBudget={cboState.minBudget}
        onChange={(budget) => {
          setCboState((cboState) => {
            return produce(cboState, draftState => {
              draftState.budget = budget
            })
          })
        }}
      />
      {/* MOBILE PROGRESS BUTTON */}
      <CboProgressButton />
    </div>
  )
}

// CboContent.propTypes = {

// }

export default CboContent
