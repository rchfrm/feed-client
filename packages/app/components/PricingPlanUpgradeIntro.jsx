import React from 'react'
import PropTypes from 'prop-types'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import PricingPlanUpgradeIntroPlan from '@/app/PricingPlanUpgradeIntroPlan'
import MarkdownText from '@/elements/MarkdownText'
import Button from '@/elements/Button'
import ArrowIcon from '@/icons/ArrowIcon'
import copy from '@/app/copy/global'
import { SidePanelContext } from '@/contexts/SidePanelContext'
import useBillingStore from '@/app/stores/billingStore'

const getBillingStoreState = (state) => ({
  canChooseFree: state.canChooseFree,
})

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
  const { hasCancelledPlan, hasNoPlan } = artist
  const { canChooseFree } = useBillingStore(getBillingStoreState)
  const hasNoPlanOrCancelled = (hasNoPlan || hasCancelledPlan) && canChooseFree

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
        return hasNoPlanOrCancelled ? 'Continue' : 'Upgrade'
      }
      return 'Close'
    }

    const button = (
      <Button
        onClick={onClick}
        trackComponentName="PricingPlanUpgradeIntro"
        isSidePanel
      >
        {buttonText()}
        <ArrowIcon
          className="ml-1"
          direction="right"
        />
      </Button>
    )

    setSidePanelButton(button)
  }, [hasBillingAccess, hasCancelledPlan, next, setSidePanelButton, toggleSidePanel])

  return (
    <div>
      <h2 className="mb-8 pr-12">{copy.pricingUpgradeIntroTitle(section)}</h2>
      <MarkdownText markdown={copy.pricingUpgradeIntroDescription(section, currencyCode, hasNoPlanOrCancelled, hasBillingAccess)} className="mb-8" />
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
