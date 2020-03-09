import React from 'react'
import PropTypes from 'prop-types'

import { BillingContext } from './contexts/BillingContext'

import styles from './AccountPage.module.css'

function AccountPagePaymentsNew({ closePanel }) {
  const { hasNoPaymentMethod, billingDetails } = React.useContext(BillingContext)
  const { defaultMethod, allPaymentMethods } = billingDetails.find(({ role }) => role === 'owner')

  return (
    <section className={styles.paymentsOverview}>

      <h2 className={styles.paymentsOverview__header}>Payment Methods</h2>

      <div>
        Total billing methods: {allPaymentMethods.length}
      </div>

    </section>
  )
}

AccountPagePaymentsNew.propTypes = {
  closePanel: PropTypes.func.isRequired,
}

export default AccountPagePaymentsNew
