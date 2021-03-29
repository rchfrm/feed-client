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
  const [billingDetails, setBillingDetails] = React.useState([])

  const fetchAllOrgs = async (user) => {
    const allOrgs = await paymentHelpers.getAllOrgsInfo({ user })
    return allOrgs
  }

  const fetchBillingDetails = async (organisation) => {
    // Set the billing details
    const billingDetails = paymentHelpers.getbillingDetails(organisation)
    return billingDetails
  }

  useAsyncEffect(async (isMounted) => {
    if (userLoading) return
    const allOrgs = await fetchAllOrgs(user)
    const organisation = allOrgs.find(({ role }) => role === 'owner')
    const billingDetails = await fetchBillingDetails(organisation)
    if (!isMounted()) return
    // Set org
    setOrganisation(organisation)
    // Set billing details
    setBillingDetails(billingDetails)
    // Set Loading over
    setLoading(false)
  }, [userLoading])

  return (
    <BillingContext.Provider
      value={{
        billingLoading: loading,
        organisation,
        billingDetails,
      }}
    >
      {children}
    </BillingContext.Provider>
  )
}

export { BillingContext, BillingContextProvider }
