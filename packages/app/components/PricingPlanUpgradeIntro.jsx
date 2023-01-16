import React from 'react'
import PropTypes from 'prop-types'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import PricingPlanUpgradeIntroPlan from '@/app/PricingPlanUpgradeIntroPlan'
import MarkdownText from '@/elements/MarkdownText'
import Button from '@/elements/Button'
import ArrowIcon from '@/icons/ArrowIcon'
import copy from '@/app/copy/global'
import brandColors from '@/constants/brandColors'
import { SidePanelContext } from '@/contexts/SidePanelContext'

const PricingPlanUpgradeIntro = ({
  currencyCode,
  section,
  setCurrentStep,
  setSidePanelButton,
  isUpgradeToPro,
  hasBillingAccess,
}) => {
  const { artist } = React.useContext(ArtistContext)
  const { toggleSidePanel } = React.useContext(SidePanelContext)
  const { hasCancelledPlan } = artist

  const next = React.useCallback(() => {
    setCurrentStep((currentStep) => currentStep + 1)
  }, [setCurrentStep])

  React.useEffect(() => {
    const onClick = () => {
      if (hasBillingAccess) {
        return next()
      }
      toggleSidePanel(false)
    }
    const buttonText = () => {
      if (hasBillingAccess) {
        return hasCancelledPlan ? 'Continue' : 'Upgrade'
      }
      return 'Close'
    }

    const button = (
      <Button version="insta" onClick={onClick} trackComponentName="PricingPlanUpgradeIntro">
        {buttonText()}
        <ArrowIcon
          className="ml-3"
          direction="right"
          fill={brandColors.offwhite}
        />
      </Button>
    )

    setSidePanelButton(button)
  }, [hasBillingAccess, hasCancelledPlan, next, setSidePanelButton, toggleSidePanel])

  return (
    <div>
      <h2 className="mb-8 pr-12">{copy.pricingUpgradeIntroTitle(section)}</h2>
      <MarkdownText markdown={copy.pricingUpgradeIntroDescription(section, currencyCode, hasCancelledPlan, hasBillingAccess)} className="mb-8" />
      {isUpgradeToPro && (
        <PricingPlanUpgradeIntroPlan currencyCode={currencyCode} />
      )}
    </div>
  )
}

PricingPlanUpgradeIntro.propTypes = {
  currencyCode: PropTypes.string,
  isUpgradeToPro: PropTypes.bool,
  hasBillingAccess: PropTypes.bool,
  section: PropTypes.string,
  setCurrentStep: PropTypes.func,
  setSidePanelButton: PropTypes.func,
}

PricingPlanUpgradeIntro.defaultProps = {
  currencyCode: 'GBP',
  isUpgradeToPro: false,
  hasBillingAccess: true,
  section: '',
  setCurrentStep: () => {},
  setSidePanelButton: () => {},
}

export default PricingPlanUpgradeIntro
