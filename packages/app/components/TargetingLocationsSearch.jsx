import React from 'react'
import TargetingLocationsSearchResultsItem from '@/app/TargetingLocationsSearchResultsItem'
import TargetingSearchSuccess from '@/app/TargetingLSearchSuccess'
import Search from '@/elements/Search'
import { getGeoLocations } from '@/app/helpers/targetingHelpers'

const TargetingLocationsSearch = () => {
  const [location, setLocation] = React.useState(null)
  const { name } = location || {}

  return (
    ! location ? (
      <>
        <p>Search for another location:</p>
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
      <TargetingSearchSuccess
        name={name}
        type="location"
        setValue={setLocation}
      />
    )
  )
}

export default TargetingLocationsSearch
