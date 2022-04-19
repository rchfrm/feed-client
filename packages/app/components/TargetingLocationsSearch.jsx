import React from 'react'

import TargetingLocationsSearchResultsItem from '@/app/TargetingLocationsSearchResultsItem'

import Search from '@/elements/Search'
import TickCircleIcon from '@/icons/TickCircleIcon'

import { getGeoLocations } from '@/app/helpers/targetingHelpers'
import brandColors from '@/constants/brandColors'

const TargetingLocationsSearch = () => {
  const [location, setLocation] = React.useState(null)
  const { name } = location || {}

  const resetSavedLocation = () => {
    setLocation(null)
  }

  return (
    !location ? (
      <>
        <p className="text-lg">Search for another location</p>
        <Search
          name="location"
          onChange={getGeoLocations}
          onClick={setLocation}
          listItem={TargetingLocationsSearchResultsItem}
          placeholder="Start typing to search..."
          className="mb-4"
        />
      </>
    ) : (
      <div className="flex items-center">
        <TickCircleIcon
          fill={brandColors.green}
          className="mr-2"
        />
        <button onClick={resetSavedLocation} className="text-left">{name} added!<span className="ml-1 underline">Add another location?</span></button>
      </div>
    )
  )
}

TargetingLocationsSearch.propTypes = {
}

TargetingLocationsSearch.defaultProps = {
}


export default TargetingLocationsSearch
