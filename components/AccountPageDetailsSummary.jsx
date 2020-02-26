import React from 'react'
import PropTypes from 'prop-types'

import styles from './AccountPage.module.css'

const getDetailsArray = (user) => {
  const { first_name, last_name, email } = user
  return [
    {
      prop: 'name',
      value: `${first_name} ${last_name}`,
    },
    {
      prop: 'email',
      value: email,
    },
  ]
}

const AccountPageDetailsSummary = ({ className, user }) => {
  // Stop here if no user
  if (!user.id) return null

  const details = getDetailsArray(user)

  return (
    <div className={className}>
      {details.map(({ prop, value }) => {
        return (
          <p className={styles.p} key={prop}>
            <strong>{ prop }: </strong>
            <span>{ value }</span>
          </p>
        )
      })}
    </div>
  )
}

AccountPageDetailsSummary.propTypes = {
  user: PropTypes.object.isRequired,
  className: PropTypes.string,
}

AccountPageDetailsSummary.defaultProps = {
  className: '',
}

export default AccountPageDetailsSummary
