import React from 'react'
import PropTypes from 'prop-types'

const getFilteredArtists = (artists, activeFilter) => {
  if (!artists) return []
  // Status filter
  if (activeFilter === 'active' || activeFilter === 'inactive' || activeFilter === 'trial') {
    return artists.filter(({ status }) => status === activeFilter)
  }
  // Budget filter
  if (activeFilter === 'budget_set') {
    return artists.filter(({ daily_budget }) => daily_budget > 0)
  }
  if (activeFilter === 'no_budget') {
    return artists.filter(({ daily_budget }) => daily_budget === 0)
  }
  return artists
}

const AllArtistsFilters = ({ artists, setFilteredArtists, className }) => {
  const statusFilters = [
    'all',
    'active',
    'inactive',
    'trial',
    'budget_set',
    'no_budget',
  ]

  // Update parent array based on active filter
  const [activeFilter, setActiveFilter] = React.useState(statusFilters[0])
  React.useEffect(() => {
    setFilteredArtists(getFilteredArtists(artists, activeFilter))
  }, [artists, activeFilter, setFilteredArtists])

  return (
    <nav className={className}>
      <ul className="flex">
        {statusFilters.map((filter) => {
          const statusClass = filter === activeFilter ? '-active' : ''
          return (
            <li key={filter} className={['mr-5', statusClass].join(' ')}>
              <button
                className={['button--filter', 'capitalize', statusClass].join(' ')}
                onClick={() => setActiveFilter(filter)}
              >
                {filter.split('_').join(' ')}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

AllArtistsFilters.propTypes = {
  artists: PropTypes.array.isRequired,
  setFilteredArtists: PropTypes.func.isRequired,
  className: PropTypes.string,
}

AllArtistsFilters.defaultProps = {
  className: '',
}


export default AllArtistsFilters
