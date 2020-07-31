import React from 'react'
import PropTypes from 'prop-types'

import AdminGrid from '@/admin/elements/AdminGrid'
import AdminGridItem from '@/admin/elements/AdminGridItem'
import UserOverview from '@/admin/UserOverview'

const UsersList = ({ users, propsToDisplay }) => {
  return (
    <AdminGrid>
      {users.map((user) => {
        return (
          <AdminGridItem key={user.id}>
            <UserOverview user={user} key={user.id} propsToDisplay={propsToDisplay} />
          </AdminGridItem>
        )
      })}
    </AdminGrid>
  )
}

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
  propsToDisplay: PropTypes.array.isRequired,
}

export default UsersList
