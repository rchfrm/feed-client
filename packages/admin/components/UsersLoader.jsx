import React from 'react'
import PropTypes from 'prop-types'

import useGetPaginated from '@/admin/hooks/useGetPaginated'

import UserOverview from '@/admin/UserOverview'

const UsersLoader = ({ userId }) => {
  const isSingleUser = !!userId
  const serverFunction = isSingleUser ? 'getUser' : 'getAllUsers'
  const serverFunctionArgs = isSingleUser ? [userId] : []
  const { data: users, error, finishedLoading } = useGetPaginated(serverFunction, serverFunctionArgs)

  return (
    <section>
      {error && <div>Failed to fetch users</div>}
      {!finishedLoading && <p>Loading...</p>}
      <p>Total: {users.length}</p>
      {users.map((user) => {
        return (
          <UserOverview key={user.id} user={user} />
        )
      })}
    </section>
  )
}

UsersLoader.propTypes = {
  userId: PropTypes.string,
}

UsersLoader.defaultProps = {
  userId: '',
}

export default UsersLoader
