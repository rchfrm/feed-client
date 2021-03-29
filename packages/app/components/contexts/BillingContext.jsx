import React from 'react'

import useAsyncEffect from 'use-async-effect'

import { UserContext } from '@/contexts/UserContext'

import paymentHelpers from '@/app/helpers/paymentHelpers'

// CREATE CONTEXT
const BillingContext = React.createContext({})
BillingContext.displayName = 'BillingContext'

// CONTEXT PROVIDER
const BillingContextProvider = ({ children }) => {
  // GET USER
  const { user, userLoading } = React.useContext(UserContext)

  const [loading, setLoading] = React.useState(true)
  const [organisation, setOrganisation] = React.useState({})
  const [hasNoPaymentMethod, setHasNoPaymentMethod] = React.useState(true)
  const [billingDetails, setBillingDetails] = React.useState([])

  const fetchBillingDetails = React.useCallback(async (user) => {
    const allOrgsInfo = await paymentHelpers.getAllOrgsInfo({ user })
    // Get the owner organisation
    const ownerOrg = allOrgsInfo.find(({ role }) => role === 'owner')
    setOrganisation(ownerOrg)
    // Set the billing details
    const billingDetails = allOrgsInfo.map(paymentHelpers.getbillingDetails)
    return billingDetails
  }, [])

  useAsyncEffect(async (isMounted) => {
    if (userLoading) return
    const billingDetails = await fetchBillingDetails(user)
    if (!isMounted()) return
    // Set billing details
    setBillingDetails(billingDetails)
    // Test if no payment is set on the owner's org
    setHasNoPaymentMethod(paymentHelpers.testNoPayment(billingDetails))
    // Set Loading over
    setLoading(false)
  }, [userLoading])

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
