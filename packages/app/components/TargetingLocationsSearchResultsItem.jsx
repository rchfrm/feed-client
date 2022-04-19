import React from 'react'
import PropTypes from 'prop-types'
import produce from 'immer'

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
    setTargetingState,
    popularLocations,
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
      setSelectedCities([...selectedCities, location.key])
    }
  }

  const saveCustomLocation = async () => {
    const customLocation = {
      ...location,
      code: location.key,
    }

    updateTargetingState(customLocation)
    updateLocationOptions(customLocation)
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
