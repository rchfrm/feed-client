import React from 'react'
import PropTypes from 'prop-types'
import { useImmerReducer } from 'use-immer'

import { SidePanelContext } from '@/contexts/SidePanelContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import PricingPlanUpgradeIntro from '@/app/PricingPlanUpgradeIntro'
import PricingPlanUpgradePlan from '@/app/PricingPlanUpgradePlan'
import PricingPlanUpgradePayment from '@/app/PricingPlanUpgradePayment'
import PricingPlanUpgradeSummary from '@/app/PricingPlanUpgradeSummary'

const profilesInitialState = []

const profilesReducer = (draftState, profilesAction) => {
  const { type: actionType, payload = {} } = profilesAction

  const {
    profile,
    profileIndex,
    plan,
  } = payload

  switch (actionType) {
    case 'add-profile':
      draftState.push(profile)
      break
    case 'update-plan':
      draftState[profileIndex].plan = plan
      break
    default:
      return draftState
  }
}

const PricingPlanUpgradeSidePanel = ({ section }) => {
  const { artistId } = React.useContext(ArtistContext)
  const [currentStep, setCurrentStep] = React.useState(0)
  const [profilesToUpgrade, setProfilesToUpgrade] = useImmerReducer(profilesReducer, profilesInitialState)

  const { setSidePanelButton, toggleSidePanel } = React.useContext(SidePanelContext)

  const pricingPlanUpgradeSteps = [
    <PricingPlanUpgradeIntro key={0} />,
    <PricingPlanUpgradePlan key={1} />,
    <PricingPlanUpgradePayment key={2} />,
    <PricingPlanUpgradeSummary key={3} />,
  ]

  const StepComponent = React.cloneElement(
    pricingPlanUpgradeSteps[currentStep],
    {
      section,
      profilesToUpgrade,
      setProfilesToUpgrade,
      setCurrentStep,
      setSidePanelButton,
      toggleSidePanel,
    },
  )

  React.useEffect(() => {
    setProfilesToUpgrade({
      type: 'add-profile',
      payload: {
        profile: {
          artistId,
          plan: 'growth',
        },
      },
    })
  }, [artistId, setProfilesToUpgrade])

  return (
    StepComponent
  )
}

PricingPlanUpgradeSidePanel.propTypes = {
  section: PropTypes.string.isRequired,
}

PricingPlanUpgradeSidePanel.defaultProps = {
}

export default PricingPlanUpgradeSidePanel
