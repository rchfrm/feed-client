import React from 'react'
import PropTypes from 'prop-types'

import { BillingContext } from '@/contexts/BillingContext'

import MarkdownText from '@/elements/MarkdownText'
import copy from '@/copy/BudgetCopy'


// const NoPayment = () => {
//   return (
//     <>
//       In order to keep using
//       {' '}
//       <Feed />
//       , you'll need to enter some payment details.
//     </>
//   )
// }

// const NoMethod = ({ name, role }) => {
//   const message = role !== 'owner'
//     ? 'Please ask the owner of the billing account, to add a method of payment.'
//     : <NoPayment />

//   return (
//     <div className={styles.paymentSummaryBlock}>
//       {name && (
//         <h3 className={styles.paymentSummaryName}>{ name }</h3>
//       )}
//       <p className={['error', styles.p, styles.noMethod].join(' ')}>{ message }</p>
//     </div>
//   )
// }

// const PaymentItem = ({ name, defaultMethod }) => {
//   const {
//     card: {
//       brand,
//       exp_month,
//       exp_year,
//       last4,
//     },
//   } = defaultMethod
//   return (
//     <div className={styles.paymentSummaryBlock}>
//       <h3 className={styles.paymentSummaryName}>{ name }</h3>
//       <p className={styles.p}>
//         <span className={styles.cardBrand}>{ brand }</span>
//       </p>
//       <p className={['mono', styles.p].join(' ')}>
//         <span>**** **** **** { last4 }</span>
//       </p>
//       <p className={['mono', styles.p].join(' ')}>
//         {/* <strong>Expiry: </strong> */}
//         <span>{ exp_month.toString().padStart(2, '0') }/{ exp_year }</span>
//       </p>
//     </div>
//   )
// }

// MAIN COMPONENT
const PaymentSummary = ({ className }) => {
  // // Stop here if no user
  // if (!user.id) return null
  // const { hasNoPaymentMethod } = React.useContext(BillingContext)

  // // Call this when ready
  // React.useEffect(() => {
  //   // Call on ready from parent
  //   const sidePanelType = hasNoPaymentMethod ? 'add-payment' : null
  //   onReady(false, sidePanelType)
  // }, [hasNoPaymentMethod])


  return (
    <div className={className}>
      {/* Intro text */}
      <MarkdownText markdown={copy.paymentIntro} />
      {/* The saved details */}
      {/* {billingDetails.map((details, index) => {
        if (!details) return null
        const { name, defaultMethod, role } = details
        // Handle no method
        if (!defaultMethod) return <NoMethod name={name} role={role} key={name ? slugify(name) : index} />
        return <PaymentItem name={name} defaultMethod={defaultMethod} key={slugify(name)} />
      })} */}
    </div>
  )
}

PaymentSummary.propTypes = {
  className: PropTypes.string,
}

PaymentSummary.defaultProps = {
  className: '',
}

// PaymentItem.propTypes = {
//   defaultMethod: PropTypes.object.isRequired,
//   name: PropTypes.string.isRequired,
// }

export default PaymentSummary
