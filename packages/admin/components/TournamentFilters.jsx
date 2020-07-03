import React from 'react'
import PropTypes from 'prop-types'

const TournamentFilters = ({ statusTypes, activeFilter, setActiveFilter }) => {
  // Remove non duplicates
  const uniqueFilters = new Set(statusTypes)
  const statusFilters = ['all', ...uniqueFilters]
  return (
    <nav>
      <p>Active filter: <strong>{activeFilter}</strong></p>
      <ul>
        {statusFilters.map((filter) => {
          const statusClass = filter === activeFilter ? '-active' : ''
          return (
            <li key={filter} className={statusClass}>
              <button onClick={() => setActiveFilter(filter)}>{filter}</button>
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
