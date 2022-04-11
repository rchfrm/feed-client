import React from 'react'

import TargetingLocationsSearchResults from '@/app/TargetingLocationsSearchResults'

import SearchInput from '@/elements/SearchInput'
import Error from '@/elements/Error'
import TickCircleIcon from '@/icons/TickCircleIcon'

import { getGeoLocations } from '@/app/helpers/targetingHelpers'
import brandColors from '@/constants/brandColors'

const TargetingLocationsSearch = () => {
  const [locations, setLocations] = React.useState([])
  const [savedLocation, setSavedLocation] = React.useState(null)
  const [hasFetchedLocations, setHasFetchedLocations] = React.useState(false)
  const [error, setError] = React.useState(null)
  const { name } = savedLocation || {}

  const resetSavedLocation = () => {
    setSavedLocation(null)
    setHasFetchedLocations(false)
  }

  const onSuccess = () => {
    setHasFetchedLocations(true)
  }

  return (
    !savedLocation ? (
      <>
        <p className="text-lg">Search for another location</p>
        <SearchInput
          name="location"
          placeholder="Start typing to search"
          onChange={getGeoLocations}
          setValue={setLocations}
          setError={setError}
          onSuccess={onSuccess}
          className="mb-4"
        />
        <Error error={error} />
        <TargetingLocationsSearchResults
          locations={locations}
          setSavedLocation={setSavedLocation}
          hasFetchedLocations={hasFetchedLocations}
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
