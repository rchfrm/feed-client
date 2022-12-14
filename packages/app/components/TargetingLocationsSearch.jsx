import React from 'react'

import TargetingLocationsSearchResultsItem from '@/app/TargetingLocationsSearchResultsItem'
import TargetingLocationsSearchSuccess from '@/app/TargetingLocationsSearchSuccess'

import Search from '@/elements/Search'

import { getGeoLocations } from '@/app/helpers/targetingHelpers'

const TargetingLocationsSearch = () => {
  const [location, setLocation] = React.useState(null)
  const { name } = location || {}

  return (
    ! location ? (
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
      <TargetingLocationsSearchSuccess
        name={name}
        setLocation={setLocation}
      />
    )
  )
}

TargetingLocationsSearch.propTypes = {
}

TargetingLocationsSearch.defaultProps = {
}

export default TargetingLocationsSearch
