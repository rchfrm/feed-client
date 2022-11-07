import React from 'react'
import PropTypes from 'prop-types'
import { capitalise } from '@/helpers/utils'

const ProfileUsersListItem = ({ user, status }) => {
  return (
    <li key={user} className={[status === 'pending' ? 'text-grey-3 italic' : null, 'mb-4'].join(' ')}>
      <div className="w-2/3 xs:w-1/2 inline-block font-bold">{user}</div>
      <div className="inline-block">{capitalise(status)}</div>
    </li>
  )
}

ProfileUsersListItem.propTypes = {
  user: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
}

export default ProfileUsersListItem
