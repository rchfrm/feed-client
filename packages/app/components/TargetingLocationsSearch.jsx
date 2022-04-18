import React from 'react'

import TargetingLocationsSearchResultsItem from '@/app/TargetingLocationsSearchResultsItem'

import Search from '@/elements/Search'
import TickCircleIcon from '@/icons/TickCircleIcon'

import { getGeoLocations } from '@/app/helpers/targetingHelpers'
import brandColors from '@/constants/brandColors'

const TargetingLocationsSearch = () => {
  const [savedLocation, setSavedLocation] = React.useState(null)
  const { name } = savedLocation || {}

  const resetSavedLocation = () => {
    setSavedLocation(null)
  }

  return (
    !savedLocation ? (
      <>
        <p className="text-lg">Search for another location</p>
        <Search
          name="location"
          onChange={getGeoLocations}
          onClick={setSavedLocation}
          listItem={TargetingLocationsSearchResultsItem}
          placeholder="Start typing to search"
          className="mb-4"
        />
      </>
    ) : (
      <div className="flex">
        <TickCircleIcon
          fill={brandColors.green}
          className="mr-2"
        />
        <button onClick={resetSavedLocation}>{name} saved! <span className="underline">Add another location?</span></button>
      </div>
    )
  )
}

TargetingLocationsSearch.propTypes = {
}

TargetingLocationsSearch.defaultProps = {
}


export default TargetingLocationsSearch
