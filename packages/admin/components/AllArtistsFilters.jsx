import React from 'react'
import PropTypes from 'prop-types'

const AllArtistsFilters = ({ statusFilters, activeFilter, setActiveFilter, className }) => {
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
  statusFilters: PropTypes.array.isRequired,
  activeFilter: PropTypes.string.isRequired,
  setActiveFilter: PropTypes.func.isRequired,
  className: PropTypes.string,
}

AllArtistsFilters.defaultProps = {
  className: '',
}


export default AllArtistsFilters
