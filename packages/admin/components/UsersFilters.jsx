import React from 'react'
import PropTypes from 'prop-types'

import ListFilters from '@/admin/elements/ListFilters'


const UsersFilter = ({ users, setFilteredUsers, className }) => {
  const statusFilters = [
    'has_artist',
    'no_artist',
  ]

  const filterTest = React.useCallback((user, filter) => {
    const { artists = {} } = user
    const totalArtists = Object.keys(artists).length
    if (filter === 'has_artist') {
      return totalArtists > 0
    }
    if (filter === 'no_artist') {
      return totalArtists === 0
    }
    return true
  }, [])

  return (
    <ListFilters
      fullList={users}
      updateList={setFilteredUsers}
      statusFilters={statusFilters}
      filterTest={filterTest}
      className={className}
    />
  )
}

UsersFilter.propTypes = {
  users: PropTypes.array.isRequired,
  setFilteredUsers: PropTypes.func.isRequired,
  className: PropTypes.string,
}

UsersFilter.defaultProps = {
  className: '',
}


export default UsersFilter
