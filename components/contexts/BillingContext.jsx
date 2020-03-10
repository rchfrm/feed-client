import React from 'react'

import useAsyncEffect from 'use-async-effect'

import { AuthContext } from './Auth'

import paymentHelpers from '../helpers/paymentHelpers'

// CREATE CONTEXT
const BillingContext = React.createContext({})
BillingContext.displayName = 'BillingContext'

// CONTEXT PROVIDER
const BillingContextProvider = ({ user, children }) => {
  const [loading, setLoading] = React.useState(true)
  const [organisation, setOrganisation] = React.useState({})
  const [hasNoPaymentMethod, setHasNoPaymentMethod] = React.useState(true)
  const [billingDetails, setBillingDetails] = React.useState([])

  const { getToken } = React.useContext(AuthContext)

  const fetchBillingDetails = async (isMounted) => {
    const token = await getToken()
    const allOrgsInfo = await paymentHelpers.getAllOrgsInfo({ user, token })
    if (isMounted && !isMounted()) return
    // Get the owner organisation
    const ownerOrg = allOrgsInfo.find(({ role }) => role === 'owner')
    setOrganisation(ownerOrg)
    // Set the billing details
    setBillingDetails(allOrgsInfo.map(paymentHelpers.getbillingDetails))
    // Test if no payment is set on the owner's org
    setHasNoPaymentMethod(paymentHelpers.testNoPayment(billingDetails))
  }

  useAsyncEffect(async (isMounted) => {
    await fetchBillingDetails(isMounted)
    // Set Loading over
    setLoading(false)
  }, [])

  return (
    <BillingContext.Provider
      value={{
        billingLoading: loading,
        organisation,
        hasNoPaymentMethod,
        billingDetails,
        fetchBillingDetails,
      }}
    >
      {children}
    </BillingContext.Provider>
  )
}

export { BillingContext, BillingContextProvider }
