import React from 'react'
import PropTypes from 'prop-types'
import produce from 'immer'

import { TargetingContext } from '@/app/contexts/TargetingContext'

import * as targetingHelpers from '@/app/helpers/targetingHelpers'

const TargetingLocationsSearchResultsItem = ({ item: location, onClick: setLocation }) => {
  const [locationAlreadyExists, setLocationAlreadyExists] = React.useState(false)
  const {
    name,
    type,
    region,
    country_code: countryCode,
  } = location

  const {
    targetingState,
    setTargetingState,
    popularLocations,
    locationOptions,
    setLocationOptions,
    selectedCountries,
    selectedCities,
    setSelectedCountries,
    setSelectedCities,
  } = React.useContext(TargetingContext)

  const isCity = type === 'city'
  const isCountry = type === 'country'

  const updateTargetingState = (customLocation) => {
    const key = isCountry ? 'countries' : 'cities'

    setTargetingState((targetingState) => {
      return produce(targetingState, draftState => {
        draftState[key].push(customLocation)
      })
    })
  }

  const updateLocationOptions = (customLocation) => {
    const currentLocations = {
      cities: [...targetingState.cities, ...(isCity ? [customLocation] : [])],
      countries: [...targetingState.countries, ...(isCountry ? [customLocation] : [])],
    }

    const updatedLocationOptions = targetingHelpers.formatPopularLocations(currentLocations, popularLocations)

    setLocationOptions(updatedLocationOptions)
  }

  const updateSelectedLocations = () => {
    if (isCountry) {
      setSelectedCountries([...selectedCountries, location.key])
    }

    if (isCity) {
      // If the city belongs to an already selected country, don't select the city
      if (selectedCountries.includes(location.country_code)) {
        return
      }
      setSelectedCities([...selectedCities, location.key])
    }
  }

  const checkIfLocationAlreadyExists = (customLocation) => {
    const flattenedLocations = Object.values(locationOptions).reduce((result, locationOption) => {
      if (!locationOption.cities) {
        return locationOption
      }

      return [...result, locationOption, ...locationOption.cities]
    }, [])

    return flattenedLocations.some((location) => location.key === customLocation.key || location.code === customLocation.key)
  }

  const saveCustomLocation = () => {
    const customLocation = {
      ...location,
      code: location.key,
    }

    const locationExists = checkIfLocationAlreadyExists(customLocation)

    // If location already exists return early
    if (locationExists) {
      setLocationAlreadyExists(true)
      return
    }

    updateTargetingState(customLocation)
    updateLocationOptions(customLocation)
    updateSelectedLocations()

    setLocation(location)
  }

  return (
    <li className="mb-3 pl-12">
      <button onClick={saveCustomLocation} className="flex items-center text-left">
        <span className="font-bold underline">{name}</span>, {isCity ? `${region}, ` : null} {countryCode}
        {locationAlreadyExists && <span className="ml-3 text-xs text-green">Already exists!</span>}
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
