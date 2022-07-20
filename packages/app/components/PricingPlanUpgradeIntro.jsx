import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import PricingPlanUpgradeIntroPlan from '@/app/PricingPlanUpgradeIntroPlan'

import MarkdownText from '@/elements/MarkdownText'
import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import copy from '@/app/copy/global'
import brandColors from '@/constants/brandColors'

const PricingPlanUpgradeIntro = ({
  section,
  setCurrentStep,
  setSidePanelButton,
}) => {
  const { artist } = React.useContext(ArtistContext)
  const { hasGrowthPlan } = artist

  const next = React.useCallback(() => {
    setCurrentStep((currentStep) => currentStep + 1)
  }, [setCurrentStep])

  React.useEffect(() => {
    const button = (
      <Button version="insta" onClick={next} trackComponentName="PricingPlanUpgradeIntro">
        Upgrade
        <ArrowAltIcon
          className="ml-3"
          direction="right"
          fill={brandColors.white}
        />
      </Button>
    )

    setSidePanelButton(button)
  }, [next, setSidePanelButton])

  return (
    <div>
      <h2 className="mb-8 pr-12">{copy.pricingUpgradeIntroTitle(section)}</h2>
      <MarkdownText markdown={copy.pricingUpgradeIntroDescription(section)} className="mb-8" />
      {hasGrowthPlan && (
        <PricingPlanUpgradeIntroPlan />
      )}
    </div>
  )
}

PricingPlanUpgradeIntro.propTypes = {
  section: PropTypes.string,
  setCurrentStep: PropTypes.func,
  setSidePanelButton: PropTypes.func,
}

PricingPlanUpgradeIntro.defaultProps = {
  section: '',
  setCurrentStep: () => {},
  setSidePanelButton: () => {},
}

export default PricingPlanUpgradeIntro
