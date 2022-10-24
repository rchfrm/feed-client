import React from 'react'
import PropTypes from 'prop-types'
import TrashIcon from '@/icons/TrashIcon'
import MarkdownText from '@/elements/MarkdownText'
import Spinner from '@/elements/Spinner'
import Error from '@/elements/Error'
import brandColors from '@/constants/brandColors'
import copy from '@/app/copy/billingCopy'
import BillingOrganizationUserDeleteAlert from '@/app/BillingOrganizationUserDeleteAlert'
import BillingOrganizationInvite from '@/app/BillingOrganizationInvite'
import * as billingHelpers from '@/app/helpers/billingHelpers'
import useAsyncEffect from 'use-async-effect'
import { getOrganizationUsers } from '@/app/helpers/billingHelpers'
import { UserContext } from '@/app/contexts/UserContext'

const BillingUsersSummary = ({
  className,
  organization,
  orgLoading,
}) => {
  const { user } = React.useContext(UserContext)
  // SHOW ALERT ON USER DELETE
  const [confirmAlert, setConfirmAlert] = React.useState('')

  // INTERNAL STATE
  const [orgUsers, setOrgUsers] = React.useState(undefined)
  const [selectedOrgUser, setSelectedOrgUser] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  // Get users with access to the organization
  useAsyncEffect(async () => {
    const { error, res } = await getOrganizationUsers(organization.id)
    if (error) {
      setError(error)
      setLoading(false)
    }
    setOrgUsers(res.users)
    setError(null)
    setLoading(false)
  }, [organization.id])

  const handleUserDelete = React.useCallback(async (orgUser, forceDelete) => {
    setSelectedOrgUser(orgUser)

    if (!forceDelete) {
      setConfirmAlert('user-delete')
      return
    }

    setLoading(true)
    const { error: serverError } = await billingHelpers.deleteOrganizationUser(organization.id, orgUser.id)
    const updatedOrgUsers = orgUsers.filter(user => user.id !== orgUser.id)
    setLoading(false)
    if (serverError) {
      setError(serverError)
      return
    }
    setOrgUsers(updatedOrgUsers)
  }, [orgUsers, organization.id])

  const makeDisplayName = orgUser => {
    const names = []

    const firstName = (orgUser.first_name || '').trim()
    if (firstName) {
      names.push(firstName)
    }

    const lastName = (orgUser.last_name || '').trim()
    if (lastName) {
      names.push(lastName)
    }

    if (user.id === orgUser.id) {
      names.push('(you)')
    }

    return names.length > 0 ? names.join(' ') : ''
  }

  const makeNameAndRoleElement = user => {
    const orgUser = organization.users[user.id]
    if (!orgUser) return
    return <span>{makeDisplayName(user)} – <strong>{orgUser.role}</strong></span>
  }

  const makeDeleteButton = orgUser => {
    const orgUserDetails = organization.users[orgUser.id]
    if (!orgUserDetails) return
    const shouldShowDeleteButton = user.id !== orgUser.id && orgUserDetails.role !== 'owner'
    if (shouldShowDeleteButton) {
      return (
        <div
          role="button"
          className="cursor-pointer"
          onClick={() => handleUserDelete(orgUser, false)}
        >
          <TrashIcon className="w-4 h-auto" fill={brandColors.red} />
        </div>
      )
    }
    return null
  }

  return (
    <div className={[className].join(' ')}>
      <h2 className="font-body font-bold mb-6">Your Team</h2>
      <MarkdownText markdown={copy.usersInfo} />
      <Error error={error} />
      {loading || orgLoading ? (
        <Spinner width={25} className="text-left justify-start mb-10" />
      ) : (
        <div className="mb-10">
          {orgUsers.length === 0 ? (
            <span>{copy.noUsers}</span>
          ) : (
            <ul>
              {orgUsers.map((user) => (
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
      )}
      <BillingOrganizationInvite
        selectedOrgId={organization.id}
      />
      <BillingOrganizationUserDeleteAlert
        confirmAlert={confirmAlert}
        setConfirmAlert={setConfirmAlert}
        user={selectedOrgUser}
        onConfirm={handleUserDelete}
      />
    </div>
  )
}

BillingUsersSummary.propTypes = {
  className: PropTypes.string,
  organization: PropTypes.object.isRequired,
  orgLoading: PropTypes.bool.isRequired,
}

BillingUsersSummary.defaultProps = {
  className: null,
}

export default BillingUsersSummary
