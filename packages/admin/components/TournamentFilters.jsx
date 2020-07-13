import React from 'react'
import PropTypes from 'prop-types'

const TournamentFilters = ({ statusTypes, activeFilter, setActiveFilter }) => {
  // Remove non duplicates
  const uniqueFilters = new Set(statusTypes)
  const statusFilters = ['all', ...uniqueFilters]
  return (
    <nav>
      <ul className="flex">
        {statusFilters.map((filter) => {
          const statusClass = filter === activeFilter ? '-active' : ''
          return (
            <li key={filter} className={['mr-5', statusClass].join(' ')}>
              <button className={['button--filter', statusClass].join(' ')} onClick={() => setActiveFilter(filter)}>{filter}</button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

TournamentFilters.propTypes = {
  statusTypes: PropTypes.array.isRequired,
  activeFilter: PropTypes.string.isRequired,
  setActiveFilter: PropTypes.func.isRequired,
}

export default TournamentFilters
