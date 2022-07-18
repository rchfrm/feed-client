import React from 'react'
import PropTypes from 'prop-types'
import shallow from 'zustand/shallow'

import useBillingStore from '@/app/stores/billingStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import PricingPlanUpgradePaymentProfilesList from '@/app/PricingPlanUpgradePaymentProfilesList'
import PricingPlanUpgradePaymentProrations from '@/app/PricingPlanUpgradePaymentProrations'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import { pricingNumbers } from '@/constants/pricing'
import brandColors from '@/constants/brandColors'

import { formatCurrency } from '@/helpers/utils'
import copy from '@/app/copy/global'

const getBillingStoreState = (state) => ({
  organisationArtists: state.organisationArtists,
})

const PricingPlanUpgradePayment = ({
  setCurrentStep,
  setSidePanelButton,
  profilesToUpgrade,
  setProfilesToUpgrade,
  prorationsPreview,
}) => {
  const { artistId, artist } = React.useContext(ArtistContext)
  const { hasGrowthPlan } = artist
  const [planPrefix] = profilesToUpgrade[artistId].split('_')

  const monthlyCost = pricingNumbers[planPrefix]?.monthlyCost?.GBP
  const {
    amount = 0,
    currency,
  } = prorationsPreview || {}

  const { organisationArtists } = useBillingStore(getBillingStoreState, shallow)

  const handlePayment = React.useCallback(() => {
    setCurrentStep((currentStep) => currentStep + 1)
  }, [setCurrentStep])

  React.useEffect(() => {
    const button = (
      <Button version="insta" onClick={handlePayment} trackComponentName="PricingPlanUpgradePayment" disabled={!amount}>
        Pay {formatCurrency(amount, currency)}
        <ArrowAltIcon
          className="ml-3"
          direction="right"
          fill={!amount ? brandColors.greyDark : brandColors.white}
        />
      </Button>
    )

    setSidePanelButton(button)
  }, [handlePayment, setSidePanelButton, monthlyCost, amount, currency])

  return (
    <div>
      <h2 className="mb-8 pr-12">Upgrade profiles</h2>
      <MarkdownText markdown={copy.pricingUpgradePlanIntro(planPrefix, monthlyCost)} className="mb-8" />
      {(hasGrowthPlan && organisationArtists.length > 1) && (
        <PricingPlanUpgradePaymentProfilesList
          profilesToUpgrade={profilesToUpgrade}
          setProfilesToUpgrade={setProfilesToUpgrade}
          organisationArtists={organisationArtists}
        />
      )}
      <PricingPlanUpgradePaymentProrations
        prorationsPreview={prorationsPreview}
        profilesToUpgrade={profilesToUpgrade}
      />
    </div>
  )
}

PricingPlanUpgradePayment.propTypes = {
  setCurrentStep: PropTypes.func,
  setSidePanelButton: PropTypes.func,
  profilesToUpgrade: PropTypes.object,
  setProfilesToUpgrade: PropTypes.func,
  prorationsPreview: PropTypes.object,
}

PricingPlanUpgradePayment.defaultProps = {
  setCurrentStep: () => {},
  setSidePanelButton: () => {},
  profilesToUpgrade: null,
  setProfilesToUpgrade: () => {},
  prorationsPreview: null,
}

export default PricingPlanUpgradePayment
