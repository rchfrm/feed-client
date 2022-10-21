import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import MarkdownText from '@/elements/MarkdownText'
import BillingPaymentMethodsAll from '@/app/BillingPaymentMethodsAll'
import BillingPaymentAdd from '@/app/BillingPaymentAdd'
import copy from '@/app/copy/billingCopy'
import {
  deletePaymentMethod,
  getBillingDetails,
  getDefaultPaymentMethod,
  setPaymentAsDefault,
} from '@/app/helpers/billingHelpers'
import useBillingStore from '@/app/stores/billingStore'
import {track} from '@/helpers/trackingHelpers'
import Error from '@/elements/Error'

const getBillingStoreState = (state) => ({
  billingStoreOrg: state.organization,
  billingStoreOrgDetails: state.billingDetails,
  billingStorePaymentMethod: state.defaultPaymentMethod,
  addBillingStoreOrgPaymentMethod: state.addPaymentMethod,
  updateBillingStoreOrgDefaultPayment: state.updateDefaultPayment,
  deleteBillingStorePaymentMethod: state.deletePaymentMethod,
})

const BillingPaymentMethodsSummary = ({
  className,
  organization,
}) => {
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState(undefined)
  const [allPaymentMethods, setAllPaymentMethods] = useState(undefined)
  const [selectedMethodId, setSelectedMethodId] = React.useState(undefined)
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  const {
    billingStoreOrg,
    billingStoreOrgDetails,
    billingStorePaymentMethod,
    addBillingStoreOrgPaymentMethod,
    updateBillingStoreOrgDefaultPayment,
    deleteBillingStorePaymentMethod,
  } = useBillingStore(getBillingStoreState)

  useEffect(() => {
    if (organization.id === billingStoreOrg.id) {
      setDefaultPaymentMethod(billingStorePaymentMethod)
      setSelectedMethodId(billingStorePaymentMethod.id)
      setAllPaymentMethods(billingStoreOrgDetails.allPaymentMethods)
      return
    }
    const { allPaymentMethods } = getBillingDetails(organization)
    setAllPaymentMethods(allPaymentMethods)
    const defaultPaymentMethod = getDefaultPaymentMethod(allPaymentMethods)
    setDefaultPaymentMethod(defaultPaymentMethod)
    setSelectedMethodId(defaultPaymentMethod.id)
  }, [organization, billingStoreOrg.id, billingStorePaymentMethod, billingStoreOrgDetails.allPaymentMethods])

  // Set payment method as default
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

  // Delete payment method
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

  const addMethod = React.useCallback(paymentMethod => {
    if (organization.id === billingStoreOrg.id) {
      addBillingStoreOrgPaymentMethod(paymentMethod)
    }
    let updatedPaymentMethods = [...allPaymentMethods, paymentMethod]
    if (paymentMethod.is_default) {
      updatedPaymentMethods = allPaymentMethods.map(pm => {
        if (pm.id === paymentMethod.id) {
          return paymentMethod
        }
        pm.is_default = false
        return pm
      })
      setDefaultPaymentMethod(paymentMethod)
    }
    setAllPaymentMethods(updatedPaymentMethods)
  }, [addBillingStoreOrgPaymentMethod, allPaymentMethods, billingStoreOrg.id, organization.id])

  return (
    <div className={[className].join(' ')}>
      <h2 className="font-body font-bold mb-6">Payment Methods</h2>
      <div className="mb-10">
        {defaultPaymentMethod ? (
          <>
            <Error error={error} />
            <BillingPaymentMethodsAll
              allPaymentMethods={allPaymentMethods}
              defaultPaymentMethod={defaultPaymentMethod}
              deleteMethod={deleteMethod}
              loading={loading}
              selectedMethodId={selectedMethodId}
              setSelectedMethodId={setSelectedMethodId}
              setMethodAsDefault={setMethodAsDefault}
            />
          </>
        ) : (
          <MarkdownText markdown={copy.noPaymentMethods} />
        )}
        <BillingPaymentAdd
          addMethodToState={addMethod}
          organization={organization}
          shouldBeDefault={!defaultPaymentMethod}
        />
      </div>
    </div>
  )
}

BillingPaymentMethodsSummary.propTypes = {
  className: PropTypes.string,
  organization: PropTypes.object.isRequired,
}

BillingPaymentMethodsSummary.defaultProps = {
  className: '',
}

export default BillingPaymentMethodsSummary
