import React from 'react'
import PropTypes from 'prop-types'

import { removeItemFromArray } from '@/helpers/utils'


const getFilteredList = (fullList, activeFilters, filterTest) => {
  if (!fullList) return []
  // If no active filters, return all items in list
  if (!activeFilters.length) return fullList
  // Return all items in list that test positive for all active filters
  return fullList.filter((artist) => {
    return activeFilters.every((filter) => filterTest(artist, filter))
  })
}

const ListFilters = ({ fullList, updateList, statusFilters, filterTest, className }) => {
  // Update parent array based on active filter
  const [activeFilters, setActiveFilters] = React.useState([])
  React.useEffect(() => {
    updateList(getFilteredList(fullList, activeFilters, filterTest))
  }, [fullList, activeFilters, updateList, filterTest])

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

ListFilters.propTypes = {
  fullList: PropTypes.array,
  updateList: PropTypes.func.isRequired,
  statusFilters: PropTypes.array.isRequired,
  filterTest: PropTypes.func.isRequired,
  className: PropTypes.string,
}

ListFilters.defaultProps = {
  fullList: [],
  className: '',
}


export default ListFilters
