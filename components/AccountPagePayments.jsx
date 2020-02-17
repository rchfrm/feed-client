// IMPORT PACKAGES
import React from 'react'
import Link from 'next/link'

// IMPORT ASSETS
// IMPORT COMPONENTS
// IMPORT CONSTANTS
import * as ROUTES from '../constants/routes'
// IMPORT CONTEXTS
import { UserContext } from './contexts/User'
// IMPORT ELEMENTS
import Error from './elements/Error'
import Feed from './elements/Feed'
import InputNew from './elements/InputNew'
import Loading from './elements/Loading'
import Nothing from './elements/Nothing'
// IMPORT HELPERS
// IMPORT HOOKS
import useFetch from './hooks/useFetch'
// IMPORT PAGES
// IMPORT STYLES
import styles from './PaymentPage.module.css'

function AccountPagePayments() {
  return (
    <div className={styles.payments}>

      <h2>Payment Details</h2>

      <Organisations />

    </div>
  )
}

export default AccountPagePayments

function Organisations() {
  // Import the user context,
  const { user } = React.useContext(UserContext)
  // ... create an array of keys to count the number of organisations a user has access to,
  const orgIDs = Object.keys(user.organizations)

  // ... if there is just one, display the associated payment methods,
  if (orgIDs.length === 1) {
    const orgId = orgIDs[0]
    return <Organisation key={orgId} multiple={false} organisationObj={user.organizations[orgId]} />
  }

  /* ... if there is more than one, display a list of billing accounts the user has access to,
  with the default default payment method */
  return orgIDs.map(orgId => <Organisation key={orgId} multiple organisationObj={user.organizations[orgId]} />)
}

function Organisation({ organisationObj, multiple }) {
  const orgLink = organisationObj._links.self.href
  const orgName = multiple ? organisationObj.name : undefined

  const organisation = useFetch(orgLink)

  if (organisation.isLoading) {
    return <Loading what={orgName} noPadding />
  }

  if (organisation.error) {
    return <Error error={organisation.error} />
  }

  if (!organisation.response) {
    return <Nothing />
  }

  const isPaymentMethod = !!organisation.response.payment

  let defaultPaymentMethod
  if (isPaymentMethod) {
    const defaultPaymentMethodId = organisation.response.payment.customer.invoice_settings.default_payment_method
    const paymentMethods = organisation.response.payment.methods.data

    paymentMethods.forEach(method => {
      if (method.id === defaultPaymentMethodId) {
        defaultPaymentMethod = method
      }
    })
  }

  return (
    <div>
      <OrganisationHeader
        defaultPaymentMethod={defaultPaymentMethod}
        isPaymentMethod={isPaymentMethod}
        multiple={multiple}
        organisation={organisation.response}
      />
      <OrganisationDetails
        defaultPaymentMethod={defaultPaymentMethod}
        isPaymentMethod={isPaymentMethod}
        multiple={multiple}
        organisation={organisation.response}
      />
    </div>
  )
}

function OrganisationHeader(props) {
  const { defaultPaymentMethod, isPaymentMethod, multiple, organisation } = props

  if (multiple) {
    return <h4 className={styles.h4}>{organisation.name}</h4>
  }

  if (isPaymentMethod) {
    return <h4 className={styles.h4}>{`**** **** **** ${defaultPaymentMethod.card.last4}`}</h4>
  }
  return <h4 className={styles.h4}>Add a way to pay</h4>
}

function OrganisationDetails(props) {
  const { defaultPaymentMethod, isPaymentMethod, multiple, organisation } = props
  const { user } = React.useContext(UserContext)

  /* If there is no payment method for the organisation, determine if the user is the owner of the organisation,
  and display the correct course of action accordingly */
  if (!isPaymentMethod) {
    const isOwner = user.organizations[organisation.id].role === 'owner'
    if (!isOwner) {
      return <p>Please ask the owner of the billing account, to add a method of payment.</p>
    }
    return (
      <p>
        In order to keep using&nbsp;
        <Feed />
        , you'll need to enter some payment details. You can do that&nbsp;
        <Link href={ROUTES.PAYMENT}><a>here</a></Link>
        .
      </p>
    )
  }

  // If the user has access to just one organisation, display only the billing email
  if (!multiple) {
    return (
      <div className={styles['payments-organisation']}>
        <div className={styles['payments-organisation-detail']}>
          <label className="label_top">Billing email:</label>
          <InputNew name="billing-email" readOnly value={defaultPaymentMethod.billing_details.email} version="text" />
        </div>
      </div>
    )
  }

  /* If the user has access to multiple organisations, display the last 4 digits of the card number,
  and the billing email */
  return (
    <div className={styles['payments-organisation']}>
      <div className={styles['payments-organisation-detail']}>
        <label className="label_top">Default card:</label>
        <InputNew name="default-card" readOnly value={`**** **** **** ${defaultPaymentMethod.card.last4}`} version="text" />
      </div>
      <div className={styles['payments-organisation-detail']}>
        <label className="label_top">Billing email:</label>
        <InputNew name="billing-email" readOnly value={defaultPaymentMethod.billing_details.email} version="text" />
      </div>
    </div>
  )
}
