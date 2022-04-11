import React from 'react'
import PropTypes from 'prop-types'

import TargetingLocationsSearchResultsItem from '@/app/TargetingLocationsSearchResultsItem'

const TargetingLocationsSearchResults = ({
  locations,
  setSavedLocation,
  hasFetchedLocations,
}) => {
  if (hasFetchedLocations && locations.length === 0) {
    return <p>No search results found.</p>
  }
  return (
    <ul className="mb-8">
      {locations.map((location) => (
        <TargetingLocationsSearchResultsItem
          key={location.key}
          location={location}
          setSavedLocation={setSavedLocation}
        />
      ))}
    </ul>
  )
}

TargetingLocationsSearchResults.propTypes = {
  locations: PropTypes.array.isRequired,
  setSavedLocation: PropTypes.func.isRequired,
  hasFetchedLocations: PropTypes.bool.isRequired,
}

TargetingLocationsSearchResults.defaultProps = {
}


export default TargetingLocationsSearchResults
