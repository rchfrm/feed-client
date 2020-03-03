import React from 'react'
import PropTypes from 'prop-types'

import useAsyncEffect from 'use-async-effect'

import { AuthContext } from './contexts/Auth'

import paymentHelpers from './helpers/payments'

const BillingDetails = ({ user, setBillingDetails, setNoPaymentMethod, setLoading, children }) => {
  const { getToken } = React.useContext(AuthContext)

  useAsyncEffect(async (isMounted) => {
    const token = await getToken()
    const allOrgsInfo = await paymentHelpers.getAllOrgsInfo({ user, token })
    if (!isMounted()) return
    const billingDetails = allOrgsInfo.map(paymentHelpers.getbillingDetails)
    setBillingDetails(billingDetails)
    // Test if no payment is set on the owner's org
    setNoPaymentMethod(paymentHelpers.testNoPayment(billingDetails))
    // Loading over
    setLoading(false)
  }, [])

  return children
}

BillingDetails.propTypes = {
  user: PropTypes.object.isRequired,
  setBillingDetails: PropTypes.func.isRequired,
  setNoPaymentMethod: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
}

export default BillingDetails
