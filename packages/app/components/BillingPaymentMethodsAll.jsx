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
  billingStoreOrg: state.organization,
  updateBillingStoreOrgDefaultPayment: state.updateDefaultPayment,
  deleteBillingStorePaymentMethod: state.deletePaymentMethod,
})

const BillingPaymentMethodsAll = ({
  allPaymentMethods,
  className,
  defaultPaymentMethod,
  organization,
  setAllPaymentMethods,
  setDefaultPaymentMethod,
}) => {
  // Read from BILLING STORE
  const {
    billingStoreOrg,
    updateBillingStoreOrgDefaultPayment,
    deleteBillingStorePaymentMethod,
  } = useBillingStore(getBillingStoreState, shallow)

  // STORE SELECTED STATE
  const [selectedMethodId, setSelectedMethodId] = React.useState(defaultPaymentMethod.id)
  const [hasDefaultSelectionChanged, setHasDefaultSelectionChanged] = React.useState(false)

  // SET AS DEFAULT
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  const setMethodAsDefault = React.useCallback(async () => {
    setLoading(true)
    const { res: newDefaultPaymentMethod, error } = await setPaymentAsDefault(organization.id, selectedMethodId)

    // Handle error
    if (error) {
      setError(error)
      setLoading(false)
      return
    }
    // Update default in store
    if (organization.id === billingStoreOrg.id) {
      updateBillingStoreOrgDefaultPayment(newDefaultPaymentMethod)
    }
    setDefaultPaymentMethod(newDefaultPaymentMethod)
    const updatedPaymentMethods = allPaymentMethods.map(pm => {
      if (pm.id === newDefaultPaymentMethod.id) {
        return newDefaultPaymentMethod
      }
      pm.is_default = false
      return pm
    })
    setAllPaymentMethods(updatedPaymentMethods)
    setError(null)
    track('billing_set_default_payment_method', { organizationId: organization.id })
    setLoading(false)
  }, [allPaymentMethods, billingStoreOrg.id, organization.id, selectedMethodId, setAllPaymentMethods, setDefaultPaymentMethod, updateBillingStoreOrgDefaultPayment])

  React.useEffect(() => {
    // Check whether the user has selected a new default card
    setHasDefaultSelectionChanged(selectedMethodId !== defaultPaymentMethod.id)
  }, [selectedMethodId, defaultPaymentMethod])

  // DELETE METHOD
  const deleteMethod = React.useCallback(async (paymentMethodId) => {
    const { error } = await deletePaymentMethod(organization.id, paymentMethodId)
    // Handle error
    if (error) {
      setError(error)
      return
    }
    if (organization.id === billingStoreOrg.id) {
      deleteBillingStorePaymentMethod(paymentMethodId)
    }
    const updatedPaymentMethods = allPaymentMethods.filter(pm => pm.id !== paymentMethodId)
    setAllPaymentMethods(updatedPaymentMethods)
    setError(null)
    track('billing_delete_payment_method', { organizationId: organization.id })
  }, [organization.id, billingStoreOrg.id, allPaymentMethods, setAllPaymentMethods, deleteBillingStorePaymentMethod])

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
          loading={loading}
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
  allPaymentMethods: PropTypes.array.isRequired,
  defaultPaymentMethod: PropTypes.object.isRequired,
  organization: PropTypes.object.isRequired,
  setAllPaymentMethods: PropTypes.func.isRequired,
  setDefaultPaymentMethod: PropTypes.func.isRequired,
}

BillingPaymentMethodsAll.defaultProps = {
  className: '',
}

export default BillingPaymentMethodsAll
