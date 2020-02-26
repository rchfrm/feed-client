import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'
import slugify from 'slugify'
import axios from 'axios'

import { AuthContext } from './contexts/Auth'

import Ellipsis from './elements/Ellipsis'

import styles from './AccountPage.module.css'

const getOrganizationDetails = (user) => {
  const { organizations = [] } = user
  const organizationsArray = Object.values(organizations)
  return organizationsArray.map(({ id, name, _links: { self: { href: link } } }) => {
    return {
      id,
      name,
      link,
    }
  })
}

const fetchOrg = async (org, token) => {
  const { link } = org
  const { data } = await axios(link, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .catch((err) => {
      return err
    })

  return data
}

const getPaymentDetails = ({ name, payment_status = 'none', payment: paymentDetails }) => {
  // If no payment status setup
  if (payment_status === 'none') {
    return {
      name,
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
    method: {
      brand,
      exp_month,
      exp_year,
      last4,
    },
  }
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

const NoMethod = ({ name }) => {
  return (
    <div className={styles.paymentSummaryBlock}>
      <h5 className={styles.paymentSummaryName}>{ name }</h5>
      <p className={[styles.p, styles.noMethod].join(' ')}>Please ask the owner of the billing account, to add a method of payment.</p>
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
        <strong>card: </strong>
        <span>{ brand }</span>
      </p>
      <p className={styles.p}>
        <strong>number: </strong>
        <span>**** **** **** { last4 }</span>
      </p>
      <p className={styles.p}>
        <strong>expiry: </strong>
        <span>{ exp_month.toString().padStart(2, '0') }/{ exp_year }</span>
      </p>
    </div>
  )
}

// MAIN COMPONENT
const AccountPagePaymentSummary = ({ className, user }) => {
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
}

AccountPagePaymentSummary.defaultProps = {
  className: '',
}

PaymentItem.propTypes = {
  method: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
}

export default AccountPagePaymentSummary
