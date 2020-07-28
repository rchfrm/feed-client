import React from 'react'
import useGetPaginated from '@/admin/hooks/useGetPaginated'

import UsersList from '@/admin/UsersList'

const AllUsersLoader = () => {
  const propsToDisplay = [
    'email',
    'role',
    'created_at',
    'updated_at',
  ]
  const extraFields = [
    'id',
    'first_name',
    'last_name',
    'artists',
    'organizations',
  ]

  const fields = [...propsToDisplay, ...extraFields]
  const { items: users, error, finishedLoading } = useGetPaginated('getAllUsers', {
    limit: 1000,
    fields: fields.join(','),
  })

  return (
    <section>
      {error && <div>Failed to fetch users</div>}
      {finishedLoading ? <p>Finished loading</p> : <p>Loading...</p>}
      <p>Total loaded: {users.length}</p>
      <UsersList users={users} propsToDisplay={propsToDisplay} />
    </section>
  )
}

export default AllUsersLoader
