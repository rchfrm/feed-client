import React from 'react'
import PropTypes from 'prop-types'

import shallow from 'zustand/shallow'

import MarkdownText from '@/elements/MarkdownText'
import Button from '@/elements/Button'
import Error from '@/elements/Error'
import Success from '@/elements/Success'

import BillingPaymentCard from '@/app/BillingPaymentCard'
import BillingOpenPayments from '@/app/BillingOpenPayments'

import useBillingStore from '@/app/stores/billingStore'

import { retryInvoicePayment } from '@/app/helpers/billingHelpers'

import copy from '@/app/copy/billingCopy'

import sidePanelStyles from '@/app/SidePanel.module.css'

// READING FROM STORE
const getBillingStoreState = (state) => ({
  nextInvoice: state.nextInvoice,
  defaultPaymentMethod: state.defaultPaymentMethod,
  organisation: state.organisation,
})

const BillingHandleFailedInvoice = ({
  setSidePanelLoading,
  setSidePanelButton,
}) => {
  // Read from BILLING STORE
  const {
    nextInvoice: failedInvoice,
    defaultPaymentMethod,
    organisation,
  } = useBillingStore(getBillingStoreState, shallow)
  const { paymentMethod } = failedInvoice
  // Is the payment method on the invoice the same as the current default
  const hasNewDefault = defaultPaymentMethod.id !== paymentMethod.id

  // RETRY PAYMENT
  const retryButtonText = hasNewDefault ? 'Retry with new payment method' : 'Retry payment'
  const [error, setError] = React.useState(null)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const retryPayment = React.useCallback(async () => {
    setSidePanelLoading(true)
    const { id: paymentMethodId } = failedInvoice.paymentMethod
    const { id: organisationId } = organisation
    const { id: invoiceId } = failedInvoice
    const { error } = await retryInvoicePayment({ organisationId, invoiceId, paymentMethodId })
    setError(error)
    if (!error) {
      // Update local state
      setIsSuccess(true)
      // Update store
    }
    setSidePanelLoading(false)
  }, [failedInvoice, organisation, setSidePanelLoading])

  return (
    <div>
      {/* INTRO */}
      <h2 className={sidePanelStyles.SidePanel__Header}>Resolve unpaid invoice</h2>
      {isSuccess ? (
        <Success className="text-xl" message="Success! The invoice has now been paid :)" />
      ) : (
        <>
          <MarkdownText markdown={copy.failedInvoiceIntro(failedInvoice.date)} />
          <BillingPaymentCard
            card={paymentMethod.card}
            currency={paymentMethod.currency}
            billingDetails={paymentMethod.billing_details}
            className="mb-6"
          />
          <MarkdownText markdown={copy.failedInvoiceAction(hasNewDefault)} />
          {/* ACTION BUTTONS... */}
          <Error error={error} />
          {/* RETRY Payment */}
          <div className="mb-4">
            <Button
              version="green small"
              label={retryButtonText}
              onClick={retryPayment}
            >
              {retryButtonText}
            </Button>
          </div>
          {/* UPDATE PAYMENT METHODS */}
          <BillingOpenPayments
            contentType="show-methods"
            buttonClassName="w-auto"
            buttonText="Change payment method"
          />
        </>
      )}
    </div>
  )
}

BillingHandleFailedInvoice.propTypes = {
  setSidePanelLoading: PropTypes.func.isRequired,
  setSidePanelButton: PropTypes.func.isRequired,
}

BillingHandleFailedInvoice.defaultProps = {
}

export default BillingHandleFailedInvoice
