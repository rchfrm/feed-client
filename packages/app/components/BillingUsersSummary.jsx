import React from 'react'
import PropTypes from 'prop-types'

import TrashIcon from '@/icons/TrashIcon'
import BillingOpenUsers from '@/app/BillingOpenUsers'
import MarkdownText from '@/elements/MarkdownText'
import * as firebaseHelpers from '@/helpers/firebaseHelpers'

import brandColors from '@/constants/brandColors'

import copy from '@/app/copy/billingCopy'

const BillingUsersSummary = ({
  users,
  className,
}) => {
  const currentUserId = firebaseHelpers.auth.currentUser.uid

  const makeDisplayName = (user) => {
    const names = []

    const fistName = (user.first_name || '').trim()
    if (fistName) {
      names.push(fistName)
    }

    const lastName = (user.last_name || '').trim()
    if (lastName) {
      names.push(lastName)
    }

    if (currentUserId === user.id) {
      names.push('(you)')
    }

    return names.length > 0 ? names.join(' ') : ''
  }

  const makeNameAndRoleElement = (user) => {
    return <span>{makeDisplayName(user)} – <strong>{user.role}</strong></span>
  }

  const makeDeleteButton = (user) => {
    // TODO: onClick handler
    return currentUserId !== user.id ? <TrashIcon className="w-4 h-auto" fill={brandColors.red} /> : null
  }

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      {/* INTRO */}
      <h3 className="font-body font-bold mb-6">Your Team</h3>
      <MarkdownText markdown={copy.usersInfo} />
      {/* SUMMARY */}
      {users.length === 0 ? (
        <span>{copy.noUsers}</span>
      ) : (
        <ul>
          {users.map((user, index) => (
            <React.Fragment key={index}>
              <li className="flex justify-between ml-5 mb-3 mr-5 last:mb-0">
                <span>{makeNameAndRoleElement(user)}</span>
                <span>{makeDeleteButton(user)}</span>
              </li>
            </React.Fragment>
          ))}
        </ul>
      )}
      {/* BUTTON (SEND INVITE) */}
      <BillingOpenUsers className="pt-2" />
    </div>
  )
}

BillingUsersSummary.propTypes = {
  users: PropTypes.array,
  className: PropTypes.string,
}

BillingUsersSummary.defaultProps = {
  users: [],
  className: null,
}

export default BillingUsersSummary
