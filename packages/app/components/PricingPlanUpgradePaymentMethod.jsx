import React from 'react'
import PropTypes from 'prop-types'

import useBillingStore from '@/app/stores/billingStore'

import AddPaymentForm from '@/app/AddPaymentForm'

import Button from '@/elements/Button'
import ArrowIcon from '@/icons/ArrowIcon'
import { ArtistContext } from '@/app/contexts/ArtistContext'

const getBillingStoreState = (state) => ({
  organization: state.organization,
  addPaymentMethodToStore: state.addPaymentMethod,
})

const PricingPlanUpgradePaymentMethod = ({
  profilesToUpgrade,
  setCurrentStep,
  setSidePanelButton,
}) => {
  const { artist } = React.useContext(ArtistContext)
  const isUpgradeToFree = profilesToUpgrade[artist.id] === 'free'
  const [addPaymentMethod, setAddPaymentMethod] = React.useState(() => {})
  const [isFormValid, setIsFormValid] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(isUpgradeToFree)

  const {
    organization: {
      id: organizationId,
    },
    addPaymentMethodToStore,
  } = useBillingStore(getBillingStoreState)

  const savePaymentMethod = React.useCallback(() => {
    addPaymentMethod()
  }, [addPaymentMethod])

  const next = React.useCallback(() => {
    setCurrentStep((currentStep) => currentStep + 1)
  }, [setCurrentStep])

  // Go to next step on success
  React.useEffect(() => {
    if (success) {
      next()
    }
  }, [success, next])

  React.useEffect(() => {
    const button = (
      <Button
        onClick={savePaymentMethod}
        isLoading={isLoading}
        isDisabled={! isFormValid}
        trackComponentName="PricingPlanUpgradePaymentMethod"
        isSidePanel
      >
        Save
        <ArrowIcon
          className="ml-1"
          direction="right"
        />
      </Button>
    )

    setSidePanelButton(button)
  }, [savePaymentMethod, setSidePanelButton, isLoading, isFormValid])

  return (
    <div>
      <h2 className="mb-8 pr-12">Add a payment method</h2>
      <p>Enter your card details below.</p>
      <AddPaymentForm
        addMethodToState={addPaymentMethodToStore}
        organizationId={organizationId}
        setAddPaymentMethod={setAddPaymentMethod}
        setSuccess={setSuccess}
        shouldBeDefault
        isFormValid={isFormValid}
        setIsFormValid={setIsFormValid}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        shouldShowLabels={false}
      />
    </div>
  )
}

PricingPlanUpgradePaymentMethod.propTypes = {
  setCurrentStep: PropTypes.func,
  setSidePanelButton: PropTypes.func,
}

PricingPlanUpgradePaymentMethod.defaultProps = {
  setCurrentStep: () => {},
  setSidePanelButton: () => {},
}

export default PricingPlanUpgradePaymentMethod
