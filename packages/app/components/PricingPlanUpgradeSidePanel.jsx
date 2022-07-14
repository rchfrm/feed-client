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
  } = payload

  const index = draftState.findIndex(({ name }) => name === profile.name)

  switch (actionType) {
    case 'add-profile':
      draftState.push(profile)
      break
    case 'remove-profile':
      draftState.splice(index, 1)
      break
    case 'update-plan':
      draftState[index].plan = profile.plan
      break
    default:
      return draftState
  }
}

const PricingPlanUpgradeSidePanel = ({ section }) => {
  const { artistId, artist: { name } } = React.useContext(ArtistContext)
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
    // Add currently active profile to 'profiles to upgrade' array
    setProfilesToUpgrade({
      type: 'add-profile',
      payload: {
        profile: {
          id: artistId,
          name,
          plan: 'growth',
        },
      },
    })
  }, [artistId, name, setProfilesToUpgrade])

  React.useEffect(() => {
    if (!profilesToUpgrade.length) return

    console.log('call preview_prorations endpoint')
    console.log(profilesToUpgrade)
  }, [profilesToUpgrade])

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
