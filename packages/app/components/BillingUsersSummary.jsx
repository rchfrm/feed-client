import React from 'react'
import PropTypes from 'prop-types'
import shallow from 'zustand/shallow'

import TrashIcon from '@/icons/TrashIcon'
import MarkdownText from '@/elements/MarkdownText'
import Spinner from '@/elements/Spinner'
import Error from '@/elements/Error'
import brandColors from '@/constants/brandColors'
import copy from '@/app/copy/billingCopy'

import BillingOrganizationUserDeleteAlert from '@/app/BillingOrganizationUserDeleteAlert'
import BillingOrganizationInvite from '@/app/BillingOrganizationInvite'

import * as firebaseHelpers from '@/helpers/firebaseHelpers'
import * as billingHelpers from '@/app/helpers/billingHelpers'
import useBillingStore from '@/app/stores/billingStore'

const getBillingStoreState = (state) => ({
  organization: state.organization,
  organizationUsers: state.organizationUsers,
  removeOrganizationUser: state.removeOrganizationUser,
})

const BillingUsersSummary = ({
  className,
}) => {
  // SHOW ALERT ON USER DELETE
  const [confirmAlert, setConfirmAlert] = React.useState('')

  // INTERNAL STATE
  const [user, setUser] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  const { organization, organizationUsers: users, removeOrganizationUser } = useBillingStore(getBillingStoreState, shallow)

  const handleUserDelete = React.useCallback(async (user, forceDelete) => {
    setUser(user)

    if (!forceDelete) {
      setConfirmAlert('user-delete')
      return
    }

    setLoading(true)
    const { error: serverError } = await billingHelpers.deleteOrganizationUser(organization.id, user.id)
    setLoading(false)
    if (serverError) {
      setError(serverError)
      return
    }

    // UPDATE STORE
    removeOrganizationUser(user)
  }, [organization.id, removeOrganizationUser])

  const currentUserId = firebaseHelpers.auth.currentUser.uid

  const makeDisplayName = (user) => {
    const names = []

    const firstName = (user.first_name || '').trim()
    if (firstName) {
      names.push(firstName)
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
    return <span>{makeDisplayName(user)} – <strong>{organization.users[user.id].role}</strong></span>
  }

  const makeDeleteButton = (user) => {
    return currentUserId !== user.id && organization.users[user.id].role !== 'owner'
      ? (
        loading
          ? (
            <Spinner width={22} className="w-auto justify-end" />
          ) : (
            <div
              role="button"
              className="cursor-pointer"
              onClick={() => handleUserDelete(user, false)}
            >
              <TrashIcon className="w-4 h-auto" fill={brandColors.red} />
            </div>
          )
      )
      : null
  }

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <h2 className="font-body font-bold mb-6">Your Team</h2>
      <MarkdownText markdown={copy.usersInfo} />
      <Error error={error} />
      <div className="mb-10">
        {users.length === 0 ? (
          <span>{copy.noUsers}</span>
        ) : (
          <ul>
            {users.map((user) => (
              <li
                key={user.id}
                className="flex justify-between ml-5 mb-3 mr-5 last:mb-0"
              >
                <span>{makeNameAndRoleElement(user)}</span>
                {makeDeleteButton(user)}
              </li>
            ))}
          </ul>
        )}
      </div>
      <BillingOrganizationInvite />
      <BillingOrganizationUserDeleteAlert
        confirmAlert={confirmAlert}
        setConfirmAlert={setConfirmAlert}
        user={user}
        onConfirm={handleUserDelete}
      />
    </div>
  )
}

BillingUsersSummary.propTypes = {
  className: PropTypes.string,
}

BillingUsersSummary.defaultProps = {
  className: null,
}

export default BillingUsersSummary
