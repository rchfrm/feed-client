import React from 'react'
import PropTypes from 'prop-types'

import Spinner from './elements/Spinner'
import BillingDetails from './BillingDetails'

import styles from './AccountPage.module.css'

function AccountPagePaymentsNew({ user, closePanel }) {
  const [loading, setLoading] = React.useState(true)
  const [noPaymentMethod, setNoPaymentMethod] = React.useState(true)
  const [billingDetails, setBillingDetails] = React.useState([])
  const [ownerBillingMethods, setOwnerBillingMethods] = React.useState([])

  // Get owner billing method
  React.useEffect(() => {
    if (!billingDetails.length) return
    console.log('billingDetails', billingDetails)
    const { defaultMethod, allPaymentMethods } = billingDetails.find(({ role }) => role === 'owner')
    setOwnerBillingMethods([...allPaymentMethods])
  }, [billingDetails.length])


  return (
    <section className={styles.paymentsOverview}>

      <h2 className={styles.paymentsOverview__header}>Payment Methods</h2>

      <BillingDetails
        user={user}
        setBillingDetails={setBillingDetails}
        setNoPaymentMethod={setNoPaymentMethod}
        setLoading={setLoading}
      >
        {
        loading
          ? (
            <Spinner className={styles.paymentsOverview__spinner} />
          ) : (
            <div>
              Total billing methods: {ownerBillingMethods.length}
            </div>
          )
      }

      </BillingDetails>

    </section>
  )
}

AccountPagePaymentsNew.propTypes = {
  user: PropTypes.object.isRequired,
  closePanel: PropTypes.func.isRequired,
}

export default AccountPagePaymentsNew
