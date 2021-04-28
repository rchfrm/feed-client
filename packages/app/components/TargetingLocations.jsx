import React from 'react'
import PropTypes from 'prop-types'

import uniq from 'lodash/uniq'

import {
  Accordion,
  AccordionItem,
  AccordionItemPanel,
} from 'react-accessible-accordion'

import TargetingSectionHeader from '@/app/TargetingSectionHeader'
import TargetingLocationsSentence from '@/app/TargetingLocationsSentence'
import TargetingLocationsSettings from '@/app/TargetingLocationsSettings'
import TargetingLocationsCountry from '@/app/TargetingLocationsCountry'
import TargetingLocationsCities from '@/app/TargetingLocationsCities'

import { TargetingContext } from '@/app/contexts/TargetingContext'

import { removeArrayOverlap } from '@/helpers/utils'

const TargetingLocations = ({
  initialCityKeys,
  initialCountryCodes,
  className,
}) => {
  // Fetch from targeting context
  const {
    locationOptions,
    selectedCities,
    setSelectedCities,
    selectedCountries,
    setSelectedCountries,
    artistIsMusician,
    spotifyConnected,
  } = React.useContext(TargetingContext)

  // BUILD ARRAY OF COUNTRIES and CITIES
  const countriesArray = React.useMemo(() => {
    return Object.values(locationOptions)
  }, [locationOptions])
  const citiesArray = React.useMemo(() => {
    return countriesArray.reduce((arr, { cities }) => {
      return [...arr, ...cities]
    }, [])
  }, [countriesArray])

  // TOGGLE CITIES AND COUNTRIES...

  // Function to update selected countries
  const updateCountries = React.useCallback((selectedCountries) => {
    // Uncheck related cities
    const citiesToPurge = selectedCountries.reduce((arr, code) => {
      const country = locationOptions[code]
      const cityKeys = country.cities.map(({ key }) => key)
      return [...arr, ...cityKeys]
    }, [])
    const purgedCities = removeArrayOverlap(selectedCities, citiesToPurge)
    setSelectedCities(purgedCities)
    // Set selected countries
    setSelectedCountries(selectedCountries)
  }, [setSelectedCountries, setSelectedCities, selectedCities, locationOptions])

  // Function to update selected cities
  const updateCities = React.useCallback((selectedCities) => {
    // Uncheck related countries
    const countriesToPurge = selectedCities.map((cityCode) => {
      // Related country code
      const { country_code } = citiesArray.find(({ key }) => key === cityCode)
      return country_code
    })
    const purgedSelectedCountries = removeArrayOverlap(selectedCountries, uniq(countriesToPurge))
    setSelectedCountries(purgedSelectedCountries)
    // Set selected countries
    setSelectedCities(selectedCities)
  }, [setSelectedCountries, setSelectedCities, selectedCountries, citiesArray])

  // SHOW COUNTRIES THAT HAVE SELECTED CITIES AS OPEN
  const getOpenCountries = () => {
    const openCountries = selectedCities.map((cityKey) => {
      const { country_code: countryOrigin } = citiesArray.find(({ key }) => key === cityKey)
      return countryOrigin
    })
    return uniq(openCountries)
  }
  const initialOpenPanels = React.useRef(getOpenCountries())

  return (
    <section className={[className].join(' ')}>
      {/* INTRO */}
      <TargetingSectionHeader className="mb-5" header="Locations" />
      <TargetingLocationsSentence
        artistIsMusician={artistIsMusician}
        spotifyConnected={spotifyConnected}
      />
      {/* AUDIENCE SETTINGS */}
      <TargetingLocationsSettings className="pt-4  mb-4" />
      {/* COUNTRIES AND CITIES */}
      <Accordion
        className="pt-6"
        allowMultipleExpanded
        allowZeroExpanded
        preExpanded={initialOpenPanels.current}
      >
        {countriesArray.map((country) => {
          const { code, cities } = country
          const hasCities = !!cities.length
          const initiallyPicked = initialCountryCodes.includes(code)
          return (
            // COUNTRY
            <AccordionItem
              key={code}
              uuid={code}
              className="mb-10 border-b-0 border-solid border-grey-2"
            >
              <TargetingLocationsCountry
                country={country}
                selectedCountries={selectedCountries}
                setSelectedCountries={updateCountries}
                hasCities={hasCities}
                totalCitiesSelected={locationOptions[code].totalCitiesSelected}
                initiallyPicked={initiallyPicked}
              />
              {/* CITIES */}
              {hasCities && (
                <AccordionItemPanel>
                  <TargetingLocationsCities
                    cities={cities}
                    selectedCities={selectedCities}
                    initialCityKeys={initialCityKeys}
                    setSelectedCities={updateCities}
                  />
                </AccordionItemPanel>
              )}
            </AccordionItem>
          )
        })}
      </Accordion>
    </section>
  )
}

TargetingLocations.propTypes = {
  initialCityKeys: PropTypes.array.isRequired,
  initialCountryCodes: PropTypes.array.isRequired,
  className: PropTypes.string,
}

TargetingLocations.defaultProps = {
  className: null,
}


export default TargetingLocations
