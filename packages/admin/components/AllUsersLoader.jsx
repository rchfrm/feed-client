import React from 'react'
import useGetPaginated from '@/admin/hooks/useGetPaginated'

import UsersList from '@/admin/UsersList'
import UsersFilters from '@/admin/UsersFilters'
import ListSearch from '@/admin/elements/ListSearch'

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

  // Update users to include full name key
  const usersWithFullName = React.useMemo(() => {
    return users.map((user) => {
      const { first_name, last_name } = user
      const full_name = `${first_name} ${last_name}`
      return { ...user, full_name }
    })
  }, [users])

  // FILTER
  // Filtered List
  const [filteredUsers, setFilteredUsers] = React.useState(usersWithFullName)
  // Search state
  const [searchedUsers, setSearchedUsers] = React.useState(filteredUsers)

  return (
    <section>
      {error && <div>Failed to fetch users</div>}
      {finishedLoading ? <p>Finished loading</p> : <p>Loading...</p>}
      <p>Total loaded: {users.length}</p>
      <p>Total filtered & searched: {filteredUsers.length}</p>
      {/* FILTERS */}
      <h4>
        <strong>Filters</strong>
      </h4>
      <UsersFilters
        setFilteredUsers={setFilteredUsers}
        users={usersWithFullName}
      />
      {/* SEARCH */}
      {!!users.length && (
        <ListSearch
          className="pt-2"
          fullList={filteredUsers}
          updateList={setSearchedUsers}
          searchBy={['full_name', 'id']}
        />
      )}
      {searchedUsers && <UsersList users={searchedUsers} propsToDisplay={propsToDisplay} />}
    </section>
  )
}

export default AllUsersLoader
