import React from 'react'
// import PropTypes from 'prop-types'

import AddPaymentForm from '@/app/AddPaymentForm'
import BillingPaymentCard from '@/app/BillingPaymentCard'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'

import { WizardContext } from '@/app/contexts/WizardContext'
import { UserContext } from '@/app/contexts/UserContext'

import useBillingStore from '@/app/stores/billingStore'

import copy from '@/app/copy/controlsPageCopy'

import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'

const getBillingStoreState = (state) => ({
  defaultPaymentMethod: state.defaultPaymentMethod,
})

const ControlsWizardPaymentStep = () => {
  const [addPaymentMethod, setAddPaymentMethod] = React.useState(() => {})
  const [isFormValid, setIsFormValid] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)

  const { user: { organizations } } = React.useContext(UserContext)
  const { next } = React.useContext(WizardContext)
  const organisationId = Object.values(organizations).find((organisation) => organisation.role === 'owner')?.id
  const { defaultPaymentMethod } = useBillingStore(getBillingStoreState)

  const {
    card,
    billing_details: billingDetails,
    is_default,
    currency,
  } = defaultPaymentMethod || {}

  const savePaymentMethod = () => {
    if (defaultPaymentMethod) {
      next()
      return
    }
    addPaymentMethod()
  }

  // GO TO NEXT STEP on SUCCESS
  React.useEffect(() => {
    if (success) {
      next()
    }
  }, [success, next])

  return (
    <>
      <MarkdownText markdown={copy.controlsWizardPaymentStepIntro} />
      {defaultPaymentMethod ? (
        <div>
          <p className="mb-4 font-bold">Your current default card:</p>
          <BillingPaymentCard
            currency={currency}
            card={card}
            billingDetails={billingDetails}
            isDefault={is_default}
            className="mb-10 max-w-sm"
          />
        </div>
      ) : (
        <AddPaymentForm
          organisationId={organisationId}
          setAddPaymentMethod={setAddPaymentMethod}
          setSuccess={setSuccess}
          shouldBeDefault
          isFormValid={isFormValid}
          setIsFormValid={setIsFormValid}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
      <Button
        version="outline-green"
        onClick={savePaymentMethod}
        spinnerFill={brandColors.black}
        className="w-1/3 ml-auto mb-12"
        loading={isLoading}
        trackComponentName="ControlsWizardPaymentStep"
      >
        Next
        <ArrowAltIcon
          className="ml-3"
          direction="right"
        />
      </Button>
    </>
  )
}

ControlsWizardPaymentStep.propTypes = {
}

export default ControlsWizardPaymentStep
