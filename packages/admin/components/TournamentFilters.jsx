import React from 'react'
import PropTypes from 'prop-types'

import ButtonPill from '@/elements/ButtonPill'

const TournamentFilters = ({ statusTypes, activeFilter, setActiveFilter }) => {
  // Remove non duplicates
  const uniqueFilters = new Set(statusTypes)
  const statusFilters = ['all', ...uniqueFilters]
  return (
    <nav>
      <ul className="flex">
        {statusFilters.map((filter) => {
          const active = filter === activeFilter
          return (
            <li key={filter} className={['mr-5'].join(' ')}>
              <ButtonPill
                active={active}
                onClick={() => setActiveFilter(filter)}
                trackComponentName="TournamentFilters"
              >
                {filter}
              </ButtonPill>
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
