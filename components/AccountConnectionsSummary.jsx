import React from 'react'
import PropTypes from 'prop-types'

import styles from './AccountPage.module.css'


const AccountConnectionsSummary = ({ className, onReady }) => {

  React.useEffect(onReady, [])

  return (
    <div className={className}>
      <p className={styles.p}>
        Link your social and streaming accounts here, as well as your website(s). If you have more than one website, you can just put the link in any empty field.
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
