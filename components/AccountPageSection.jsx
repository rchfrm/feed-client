import React from 'react'
import PropTypes from 'prop-types'

import AccountPageDetailsSummary from './AccountPageDetailsSummary'
import AccountPagePaymentSummary from './AccountPagePaymentSummary'

import styles from './AccountPage.module.css'

const getSection = (type, user) => {
  // Get account section
  if (type === 'account') {
    return (
      <AccountPageDetailsSummary
        className={styles.accountPageSection__details}
        user={user}
      />
    )
  }
  // Get payment summary
  if (type === 'payment') {
    return (
      <AccountPagePaymentSummary
        className={styles.accountPageSection__details}
        user={user}
      />
    )
  }
}

const AccountPageSection = ({ title, type, user, buttonText, onClick }) => {

  const section = getSection(type, user)

  return (
    <section className={styles.accountPageSection}>
      <h2 className={[styles.h2, 'h2'].join()}>{title}</h2>

      {section}

      {buttonText && (
        <button onClick={onClick} className="button  button--black">
          <span>{ buttonText }</span>
        </button>
      )}
    </section>
  )
}

AccountPageSection.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
}

AccountPageSection.defaultProps = {
  title: '',
  buttonText: '',
  onClick: () => {},
}

export default AccountPageSection
