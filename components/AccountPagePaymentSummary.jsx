import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import slugify from 'slugify'

import { BillingContext } from './contexts/BillingContext'

import Feed from './elements/Feed'

import * as ROUTES from '../constants/routes'

import styles from './AccountPage.module.css'


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
      <p className={['error', styles.p, styles.noMethod].join(' ')}>{ message }</p>
    </div>
  )
}

const PaymentItem = ({ name, defaultMethod }) => {
  const {
    card: {
      brand,
      exp_month,
      exp_year,
      last4,
    },
  } = defaultMethod
  return (
    <div className={styles.paymentSummaryBlock}>
      <h5 className={styles.paymentSummaryName}>{ name }</h5>
      <p className={styles.p}>
        <span className={styles.cardBrand}>{ brand }</span>
      </p>
      <p className={['mono', styles.p].join(' ')}>
        <span>**** **** **** { last4 }</span>
      </p>
      <p className={['mono', styles.p].join(' ')}>
        {/* <strong>Expiry: </strong> */}
        <span>{ exp_month.toString().padStart(2, '0') }/{ exp_year }</span>
      </p>
    </div>
  )
}

// MAIN COMPONENT
const AccountPagePaymentSummary = ({ className, user, onReady }) => {
  // Stop here if no user
  if (!user.id) return null
  const { hasNoPaymentMethod, billingDetails } = React.useContext(BillingContext)

  console.log('billingDetails', billingDetails)

  // Call this when ready
  React.useEffect(() => {
    // Call on ready from parent
    const buttonText = hasNoPaymentMethod ? 'Add a payment method' : null
    const sidePanelType = hasNoPaymentMethod ? 'add-payment' : null
    onReady(buttonText, sidePanelType)
  }, [hasNoPaymentMethod])


  return (
    <div className={className}>
      {/* Intro text */}
      <p>Right now, the beta version of Feed is free to use! In future, you’ll be able to add payment details here.</p>
      <p>
        More details on
        {' '}
        <Feed />
        's pricing is
        {' '}
        <Link href={ROUTES.PRICES}><a>here</a></Link>.
      </p>
      {/* The saved details */}
      {billingDetails.map((details) => {
        if (!details) return null
        const { name, defaultMethod, role } = details
        // Handle no method
        if (!defaultMethod) return <NoMethod name={name} role={role} key={slugify(name)} />
        return <PaymentItem name={name} defaultMethod={defaultMethod} key={slugify(name)} />
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
  defaultMethod: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
}

export default AccountPagePaymentSummary
