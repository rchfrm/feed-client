import React from 'react'
import PropTypes from 'prop-types'

import useGetPaginated from '@/admin/hooks/useGetPaginated'

import Error from '@/elements/Error'
import UsersFilters from '@/admin/UsersFilters'
import ListSearch from '@/admin/elements/ListSearch'
import ListSort from '@/admin/elements/ListSort'
import EntityList from '@/admin/EntityList'
import Entity from '@/admin/Entity'
import { InterfaceContext } from '@/contexts/InterfaceContext'

const UsersLoader = ({ id }) => {
  const isSingleUser = !!id

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

  // GET DATA
  const serverFunction = isSingleUser ? 'getUser' : 'getAllUsers'
  const fields = [...propsToDisplay, ...extraFields]
  const requestProps = {
    limit: 100,
    fields: fields.join(','),
  }
  const serverFunctionArgs = isSingleUser ? [id, requestProps] : [requestProps]
  const { data: users, error, finishedLoading } = useGetPaginated(serverFunction, serverFunctionArgs)

  // Turn off global loading when finished
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
  React.useEffect(() => {
    if (finishedLoading) {
      toggleGlobalLoading(false)
    }
  }, [finishedLoading, toggleGlobalLoading])

  // FILTER
  // Filtered List
  const [filteredUsers, setFilteredUsers] = React.useState(users)
  // Search state
  const [searchedUsers, setSearchedUsers] = React.useState(filteredUsers)
  // Sorted state
  const [sortedUsers, setSortedUsers] = React.useState(searchedUsers)

  // GET DATA ARRAY BASED ON PAGE TYPE
  const usersArray = isSingleUser ? users : sortedUsers

  if (!usersArray) {
    return (
      <section className="content">
        <p>Loading...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="content">
        <p>Failed to fetch users.</p>
        <Error error={error} />
      </section>
    )
  }

  if (isSingleUser) {
    return (
      <section className="content">
        <Entity
          entity={usersArray[0]}
          propsToDisplay={propsToDisplay}
        />
      </section>
    )
  }

  return (
    <section>
      {finishedLoading || error ? <p>Finished loading</p> : <p>Loading...</p>}
      <p>Total loaded: {users.length}</p>
      <p>Total filtered & searched: {sortedUsers.length}</p>
      {/* FILTERS */}
      <h4><strong>Filters</strong></h4>
      <UsersFilters
        setFilteredUsers={setFilteredUsers}
        users={users}
      />
      {/* SEARCH */}
      <ListSearch
        className="pt-2"
        fullList={filteredUsers}
        updateList={setSearchedUsers}
        searchBy={['full_name', 'id']}
      />
      {/* SORT */}
      <h4><strong>Sort</strong></h4>
      <ListSort
        fullList={searchedUsers}
        updateList={setSortedUsers}
        sortOptions={['full_name', 'created_at']}
      />
      {/* LIST */}
      <EntityList
        entities={usersArray}
        propsToDisplay={propsToDisplay}
      />
    </section>
  )
}

UsersLoader.propTypes = {
  id: PropTypes.string,
}

UsersLoader.defaultProps = {
  id: '',
}

export default UsersLoader
