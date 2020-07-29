import React from 'react'
import PropTypes from 'prop-types'

import { removeItemFromArray } from '@/helpers/utils'

const runFilterTest = (artist, filter) => {
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
}

const getFilteredArtists = (artists, activeFilters) => {
  if (!artists) return []
  // If no active filters, return all artists
  if (!activeFilters.length) return artists
  // Return all artists that test positive for all active filters
  return artists.filter((artist) => {
    return activeFilters.every((filter) => runFilterTest(artist, filter))
  })
}

const AllArtistsFilters = ({ artists, setFilteredArtists, className }) => {
  const statusFilters = [
    'active',
    'inactive',
    'trial',
    'budget_set',
    'no_budget',
  ]

  // Update parent array based on active filter
  const [activeFilters, setActiveFilters] = React.useState([])
  React.useEffect(() => {
    setFilteredArtists(getFilteredArtists(artists, activeFilters))
  }, [artists, activeFilters, setFilteredArtists])

  // Clear filters
  const clearFilters = () => setActiveFilters([])
  // Toggle active filter
  const toggleFilter = (filter) => {
    const filterIndex = activeFilters.indexOf(filter)
    const isFilterActive = filterIndex > -1
    // Add filter to active list
    if (!isFilterActive) {
      setActiveFilters([...activeFilters, filter])
      return
    }
    // Remove filter from active list
    const updatedFilters = removeItemFromArray({ array: [...activeFilters], index: filterIndex })
    setActiveFilters(updatedFilters)
  }

  return (
    <nav className={className}>
      <ul className="flex">
        {/* Filter buttons */}
        {statusFilters.map((filter) => {
          const statusClass = activeFilters.includes(filter) ? '-active' : ''
          return (
            <li key={filter} className={['mr-5', statusClass].join(' ')}>
              <button
                className={['button--filter', 'capitalize', statusClass].join(' ')}
                onClick={() => toggleFilter(filter)}
              >
                {filter.split('_').join(' ')}
              </button>
            </li>
          )
        })}
        {/* Clear filters button */}
        <li className={['mr-5'].join(' ')}>
          <button
            className={['button--filter', 'button--filter-empty', 'capitalize', activeFilters.length ? '-active' : '-inactive'].join(' ')}
            onClick={clearFilters}
          >
            × Clear
          </button>
        </li>
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
