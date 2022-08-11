import React from 'react'
import PropTypes from 'prop-types'

import shallow from 'zustand/shallow'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'

import BillingPaymentCard from '@/app/BillingPaymentCard'

import useBillingStore from '@/app/stores/billingStore'

import { setPaymentAsDefault, deletePaymentMethod } from '@/app/helpers/billingHelpers'
import { track } from '@/helpers/trackingHelpers'

import copy from '@/app/copy/billingCopy'

// READING FROM STORE
const getBillingStoreState = (state) => ({
  billingDetails: state.billingDetails,
  defaultPaymentMethod: state.defaultPaymentMethod,
  organisation: state.organisation,
  updateDefaultPayment: state.updateDefaultPayment,
  deletePaymentMethod: state.deletePaymentMethod,
})

const BillingPaymentMethodsAll = ({ className }) => {
  // Read from BILLING STORE
  const {
    billingDetails: { allPaymentMethods },
    defaultPaymentMethod,
    deletePaymentMethod: deletePaymentMethodStore,
    organisation: { id: organisationId },
    updateDefaultPayment: updateDefaultPaymentStore,
  } = useBillingStore(getBillingStoreState, shallow)

  // STORE SELECTED STATE
  const [selectedMethodId, setSelectedMethodId] = React.useState(defaultPaymentMethod.id)
  const [hasDefaultSelectionChanged, setHasDefaultSelectionChanged] = React.useState(false)

  // SET AS DEFAULT
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const setMethodAsDefault = React.useCallback(async () => {
    setIsLoading(true)
    const { res: newDefaultPaymentMethod, error } = await setPaymentAsDefault({ organisationId, paymentMethodId: selectedMethodId })

    // Handle error
    if (error) {
      setError(error)
      setIsLoading(false)

      return
    }
    // Update default in store
    updateDefaultPaymentStore(newDefaultPaymentMethod)
    setError(null)
    track('billing_set_default_payment_method', { organisationId })
    setIsLoading(false)
  }, [organisationId, selectedMethodId, updateDefaultPaymentStore])

  React.useEffect(() => {
    // Check whether the user has selected a new default card
    setHasDefaultSelectionChanged(selectedMethodId !== defaultPaymentMethod.id)
  }, [selectedMethodId, defaultPaymentMethod])

  // DELETE METHOD
  const deleteMethod = React.useCallback(async (paymentMethodId) => {
    const { error } = await deletePaymentMethod(organisationId, paymentMethodId)
    // Handle error
    if (error) {
      setError(error)
      return
    }
    deletePaymentMethodStore(paymentMethodId)
    setError(null)
    track('billing_delete_payment_method', { organisationId })
  }, [organisationId, deletePaymentMethodStore])

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <MarkdownText markdown={copy.choosePaymentIntro} />
      <Error error={error} />
      <div className="mb-10">
        {allPaymentMethods.map((method) => {
          const { id, currency, card, billing_details: cardBillingDetails, is_default } = method
          return (
            <BillingPaymentCard
              key={id}
              paymentMethodId={id}
              currency={currency}
              card={card}
              billingDetails={cardBillingDetails}
              isDefault={is_default}
              isSelected={id === selectedMethodId}
              isButton
              allowDelete
              onClick={() => {
                setSelectedMethodId(id)
              }}
              onDelete={deleteMethod}
              className="max-w-xs mb-6 last:mb-0"
            />
          )
        })}
      </div>
      {hasDefaultSelectionChanged && (
        <Button
          version="black"
          onClick={setMethodAsDefault}
          trackComponentName="BillingPaymentMethodsAll"
          loading={isLoading}
          className="w-full mb-10"
        >
          Set as default
        </Button>
      )}
    </div>
  )
}

BillingPaymentMethodsAll.propTypes = {
  className: PropTypes.string,
}

BillingPaymentMethodsAll.defaultProps = {
  className: null,
}

export default BillingPaymentMethodsAll
