import React from 'react'
import PropTypes from 'prop-types'

import styles from './PaymentMethodButton.module.css'

const PaymentMethodButton = ({ method, defaultMethodId, onClick }) => {
  // Stop here if no method
  if (!method) return null
  const {
    id,
    billing_details: { name },
    card: { brand, exp_month, exp_year, last4 },
  } = method

  const isDefault = defaultMethodId === id

  const className = isDefault
    ? [styles.PaymentMethodButton, styles.default].join(' ')
    : styles.PaymentMethodButton

  const handleClick = () => onClick(id)

  return (
    <a
      className={className}
      role="button"
      onClick={handleClick}
    >

      <div className={styles.buttonIcon}>
        <span className={styles.buttonIcon__inner} />
      </div>

      <div className={styles.cardDetails}>
        <p className={styles.brand}><strong>{brand}</strong></p>
        <p className={['mono', styles.number].join(' ')}>xxxx xxxx xxxx xxxx {last4}</p>
        <p className={['mono', styles.exp].join(' ')}>{ exp_month.toString().padStart(2, '0') }/{ exp_year }</p>
        <p className={styles.name}>{name}</p>
      </div>

    </a>
  )
}

PaymentMethodButton.propTypes = {
  method: PropTypes.object.isRequired,
  defaultMethodId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default PaymentMethodButton
