import React from 'react'
import PropTypes from 'prop-types'

import ListFilters from '@/admin/elements/ListFilters'


const ArtistsFilters = ({ artists, setFilteredArtists, className }) => {
  const statusFilters = [
    'active',
    'inactive',
    'trial',
    'budget_set',
    'no_budget',
  ]

  const filterTest = React.useCallback((artist, filter) => {
    const { status, daily_budget } = artist
    if (filter === 'active' || filter === 'inactive' || filter === 'trial') {
      return status === filter
    }
    if (filter === 'budget_set') {
      return daily_budget > 0
    }
    if (filter === 'no_budget') {
      return daily_budget === 0
    }
  }, [])

  return (
    <ListFilters
      fullList={artists}
      updateList={setFilteredArtists}
      statusFilters={statusFilters}
      filterTest={filterTest}
      className={className}
      allowMultipleFilters
    />
  )
}

ArtistsFilters.propTypes = {
  artists: PropTypes.array.isRequired,
  setFilteredArtists: PropTypes.func.isRequired,
  className: PropTypes.string,
}

ArtistsFilters.defaultProps = {
  className: '',
}


export default ArtistsFilters
