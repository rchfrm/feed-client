import React from 'react'
import PropTypes from 'prop-types'

import { removeItemFromArray } from '@/helpers/utils'


const getFilteredList = (fullList, activeFilters, filterTest) => {
  if (! fullList) return []
  // If no active filters, return all items in list
  if (! activeFilters.length) return fullList
  // Return all items in list that test positive for all active filters
  return fullList.filter((item) => {
    return activeFilters.every((filter) => filterTest(item, filter))
  })
}

const ListFilters = ({
  fullList,
  updateList,
  statusFilters,
  filterTest,
  allowMultipleFilters,
  className,
}) => {
  // Update parent array based on active filter
  const [activeFilters, setActiveFilters] = React.useState([])
  React.useEffect(() => {
    const updatedList = getFilteredList(fullList, activeFilters, filterTest)
    updateList(updatedList)
  }, [fullList, activeFilters, updateList, filterTest])

  // Clear filters
  const clearFilters = () => setActiveFilters([])
  // Set active filter (if only allowing one filter)
  const setFilter = (filter) => {
    setActiveFilters([filter])
  }
  // Toggle active filter (if allowing multiple filters...)
  const toggleFilter = (filter) => {
    const filterIndex = activeFilters.indexOf(filter)
    const isFilterActive = filterIndex > -1
    // Add filter to active list
    if (! isFilterActive) {
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
          const onClick = allowMultipleFilters ? toggleFilter : setFilter
          const title = filter.split('_').join(' ')
          return (
            <li key={filter} className={['mr-5', statusClass].join(' ')}>
              <button
                className={['button--filter', 'capitalize', statusClass].join(' ')}
                onClick={() => onClick(filter)}
              >
                {title}
              </button>
            </li>
          )
        })}
        {/* Clear filters button (if allowing multiple) */}
        {allowMultipleFilters && (
          <li className={['mr-5'].join(' ')}>
            <button
              className={['button--filter', 'button--filter-empty', 'capitalize', activeFilters.length ? '-active' : '-inactive'].join(' ')}
              onClick={clearFilters}
            >
              × Clear
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}

ListFilters.propTypes = {
  fullList: PropTypes.array,
  updateList: PropTypes.func.isRequired,
  statusFilters: PropTypes.array.isRequired,
  filterTest: PropTypes.func.isRequired,
  allowMultipleFilters: PropTypes.bool,
  className: PropTypes.string,
}

ListFilters.defaultProps = {
  fullList: [],
  allowMultipleFilters: false,
  className: '',
}


export default ListFilters
