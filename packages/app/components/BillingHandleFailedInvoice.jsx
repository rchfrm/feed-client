import React from 'react'
import shallow from 'zustand/shallow'

import MarkdownText from '@/elements/MarkdownText'
import Button from '@/elements/Button'

import BillingPaymentCard from '@/app/BillingPaymentCard'

import useBillingStore from '@/app/stores/billingStore'

import copy from '@/app/copy/billingCopy'

import sidePanelStyles from '@/SidePanel.module.css'

// READING FROM STORE
const getBillingStoreState = (state) => ({
  latestInvoice: state.latestInvoice,
  defaultPaymentMethod: state.defaultPaymentMethod,
  organisation: state.organisation,
})

const BillingHandleFailedInvoice = () => {
  // Read from BILLING STORE
  const {
    latestInvoice: failedInvoice,
    defaultPaymentMethod,
  } = useBillingStore(getBillingStoreState, shallow)
  // RETRY PAYMENT
  const retryButtonText = 'Retry payment'
  return (
    <div>
      {/* INTRO */}
      <h2 className={sidePanelStyles.SidePanel__Header}>Resolve unpaid invoice</h2>
      <MarkdownText markdown={copy.failedInvoiceIntro(failedInvoice.date, !!defaultPaymentMethod)} />
      {defaultPaymentMethod && (
        <BillingPaymentCard
          card={defaultPaymentMethod.card}
          currency={defaultPaymentMethod.currency}
          billingDetails={defaultPaymentMethod.billing_details}
          className="mb-6"
        />
      )}
      <MarkdownText markdown={copy.failedInvoiceAction} />
      {/* RETRY Payment */}
      <div className="mb-4">
        <Button
          version="green small"
          label={retryButtonText}
          href={failedInvoice.hosted_invoice_url}
          trackComponentName="BillingHandleFailedInvoice"
        >
          {retryButtonText}
        </Button>
      </div>
    </div>
  )
}

BillingHandleFailedInvoice.propTypes = {
}

BillingHandleFailedInvoice.defaultProps = {
}

export default BillingHandleFailedInvoice
