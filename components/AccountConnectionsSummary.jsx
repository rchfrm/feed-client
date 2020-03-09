import React from 'react'
import PropTypes from 'prop-types'

import styles from './AccountPage.module.css'


const AccountConnectionsSummary = ({ className, onReady }) => {

  React.useEffect(onReady, [])

  return (
    <div className={className}>
      <p className={styles.p}>
        Connections are the links associated with your accounts. You can edit them below.
      </p>
    </div>
  )
}

AccountConnectionsSummary.propTypes = {
  className: PropTypes.string,
  onReady: PropTypes.func.isRequired,
}

AccountConnectionsSummary.defaultProps = {
  className: '',
}

export default AccountConnectionsSummary
