import React from 'react'
import useGetPaginated from '@/admin/hooks/useGetPaginated'

import UserOverview from '@/admin/UserOverview'

const AllUsersLoader = () => {
  const { items: users, error, finishedLoading } = useGetPaginated('getAllUsers')

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

export default AllUsersLoader
