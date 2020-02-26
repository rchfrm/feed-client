import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'
import slugify from 'slugify'
import axios from 'axios'

import { AuthContext } from './contexts/Auth'

import Ellipsis from './elements/Ellipsis'
import Feed from './elements/Feed'

import styles from './AccountPage.module.css'

const getOrganizationDetails = (user) => {
  const { organizations = [] } = user
  const organizationsArray = Object.values(organizations)
  return organizationsArray.map(({ id, name, role, _links: { self: { href: link } } }) => {
    return {
      id,
      name,
      link,
      role,
    }
  })
}

const fetchOrg = async (org, token) => {
  const { link, role } = org
  const { data } = await axios(link, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .catch((err) => {
      return err
    })

  return {
    ...data,
    role,
  }
}

const getPaymentDetails = ({ name, payment_status = 'none', payment: paymentDetails, role }) => {
  // If no payment status setup
  if (payment_status === 'none') {
    return {
      name,
      role,
      method: false,
    }
  }
  // Get default payment method
  // TODO use better method then first method when API is ready
  const { methods: { data: paymentMethods } } = paymentDetails
  const [method] = paymentMethods
  const { card: { brand, exp_month, exp_year, last4 } } = method
  return {
    name,
    role,
    method: {
      brand,
      exp_month,
      exp_year,
      last4,
    },
  }
}

// Run this to test if there is no active payment method
// returns true if no payment
const testNoPayment = (paymentDetails) => {
  return paymentDetails.some(({ method, role }) => {
    return !method && role === 'owner'
  })
}

// SUB-COMPONENTS
const LoadingState = () => {
  return (
    <p className="p">
      Fetching payment methods
      <Ellipsis />
    </p>
  )
}

const NoPayment = () => {
  return (
    <>
      In order to keep using
      {' '}
      <Feed />
      , you'll need to enter some payment details.
    </>
  )
}

const NoMethod = ({ name, role }) => {
  const message = role !== 'owner'
    ? 'Please ask the owner of the billing account, to add a method of payment.'
    : <NoPayment />

  return (
    <div className={styles.paymentSummaryBlock}>
      <h5 className={styles.paymentSummaryName}>{ name }</h5>
      <p className={[styles.p, styles.noMethod].join(' ')}>{ message }</p>
    </div>
  )
}

const PaymentItem = ({ name, method }) => {
  const {
    brand,
    exp_month,
    exp_year,
    last4,
  } = method
  return (
    <div className={styles.paymentSummaryBlock}>
      <h5 className={styles.paymentSummaryName}>{ name }</h5>
      <p className={styles.p}>
        <strong>Card: </strong>
        <span>{ brand }</span>
      </p>
      <p className={styles.p}>
        <strong>Number: </strong>
        <span>**** **** **** { last4 }</span>
      </p>
      <p className={styles.p}>
        <strong>Expiry: </strong>
        <span>{ exp_month.toString().padStart(2, '0') }/{ exp_year }</span>
      </p>
    </div>
  )
}

// MAIN COMPONENT
const AccountPagePaymentSummary = ({ className, user, onReady }) => {
  // Stop here if no user
  if (!user.id) return null

  const { getToken } = React.useContext(AuthContext)
  const [loading, setLoading] = React.useState(true)
  const [paymentDetails, setPaymentDetails] = React.useState([])
  // Get org details in nice array
  const orgDetails = getOrganizationDetails(user)

  // When component mounts, get the payment details
  useAsyncEffect(async (isMounted) => {
    const token = await getToken()
    const fetchOrgPromises = orgDetails.map((org) => fetchOrg(org, token))
    const allOrgsInfo = await Promise.all(fetchOrgPromises)
    if (!isMounted()) return
    const paymentDetails = allOrgsInfo.map(getPaymentDetails)
    setPaymentDetails(paymentDetails)
    setLoading(false)
    // Test if no payment is set on the owner's org
    const isNoPayment = testNoPayment(paymentDetails)
    // Call on ready from parent
    const buttonText = isNoPayment ? 'Add a payment method' : ''
    onReady(buttonText)
  }, [])

  if (loading) return <LoadingState />

  return (
    <div className={className}>
      {paymentDetails.map(({ name, method }) => {
        // Handle no method
        if (!method) return <NoMethod name={name} key={slugify(name)} />
        return <PaymentItem name={name} method={method} key={slugify(name)} />
      })}
    </div>
  )
}

AccountPagePaymentSummary.propTypes = {
  user: PropTypes.object.isRequired,
  className: PropTypes.string,
  onReady: PropTypes.func.isRequired,
}

AccountPagePaymentSummary.defaultProps = {
  className: '',
}

PaymentItem.propTypes = {
  method: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
}

export default AccountPagePaymentSummary
