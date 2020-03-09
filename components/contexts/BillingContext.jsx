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
  const organisation = React.useRef({})
  const hasNoPaymentMethod = React.useRef(true)
  const billingDetails = React.useRef([])

  const { getToken } = React.useContext(AuthContext)

  useAsyncEffect(async (isMounted) => {
    const token = await getToken()
    const allOrgsInfo = await paymentHelpers.getAllOrgsInfo({ user, token })
    if (!isMounted()) return
    // Get the owner organisation
    const ownerOrg = allOrgsInfo.find(({ role }) => role === 'owner')
    organisation.current = ownerOrg
    // Set the billing details
    billingDetails.current = allOrgsInfo.map(paymentHelpers.getbillingDetails)
    // Test if no payment is set on the owner's org
    hasNoPaymentMethod.current = paymentHelpers.testNoPayment(billingDetails.current)
    // Loading over
    setLoading(false)
  }, [])

  return (
    <BillingContext.Provider
      value={{
        billingLoading: loading,
        organisation: organisation.current,
        hasNoPaymentMethod: hasNoPaymentMethod.current,
        billingDetails: billingDetails.current,
      }}
    >
      {children}
    </BillingContext.Provider>
  )
}

export { BillingContext, BillingContextProvider }
