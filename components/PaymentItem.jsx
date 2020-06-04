import React from 'react'
import PropTypes from 'prop-types'

import styles from '@/PaymentItem.module.css'

const PaymentItem = ({ method, onSelect }) => {
  const { is_default } = method
  const defaultClass = is_default ? '_default' : ''
  const parentClass = [styles.item, defaultClass].join(' ')
  const {
    card: {
      brand,
      exp_month,
      exp_year,
      last4,
    },
  } = method

  return (
    <li className={parentClass}>
      <a className={styles.itemLink} role="button" onClick={onSelect}>
        <div className="radioIcon" />
        <div className="cardDetails">
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
      </a>
    </li>
  )
}

PaymentItem.propTypes = {
  method: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default PaymentItem
