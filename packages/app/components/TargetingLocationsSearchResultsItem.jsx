import React from 'react'
import PropTypes from 'prop-types'

import { TargetingContext } from '@/app/contexts/TargetingContext'

import * as targetingHelpers from '@/app/helpers/targetingHelpers'

const TargetingLocationsSearchResultsItem = ({ item: location, onClick: setSavedLocation }) => {
  const {
    name,
    type,
    region,
    country_code: countryCode,
  } = location

  const {
    targetingState,
    popularLocations,
    setLocationOptions,
    selectedCountries,
    selectedCities,
    setSelectedCountries,
    setSelectedCities,
  } = React.useContext(TargetingContext)

  const isCity = type === 'city'
  const isCountry = type === 'country'

  const updateLocationOptions = () => {
    const formattedLocation = {
      ...location,
      code: location.key,
    }

    const currentLocations = {
      cities: [...targetingState.cities, ...(isCity ? [formattedLocation] : [])],
      countries: [...targetingState.countries, ...(isCountry ? [formattedLocation] : [])],
    }

    const updatedLocationOptions = targetingHelpers.formatPopularLocations(currentLocations, popularLocations)

    setLocationOptions(updatedLocationOptions)
  }

  const updateSelectedLocations = () => {
    if (isCountry) {
      setSelectedCountries([...selectedCountries, location.key])
    }

    if (isCity) {
      setSelectedCities([...selectedCities, location.key])
    }
  }

  const saveCustomLocation = async () => {
    updateLocationOptions()
    updateSelectedLocations()

    setSavedLocation(location)
  }

  return (
    <li className="mb-3 pl-12">
      <button onClick={saveCustomLocation} className="align-left">
        <span className="font-bold underline">{name}</span>, {isCity ? `${region}, ` : null} {countryCode}
      </button>
    </li>
  )
}

TargetingLocationsSearchResultsItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

TargetingLocationsSearchResultsItem.defaultProps = {
}


export default TargetingLocationsSearchResultsItem
