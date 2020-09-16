import React from 'react'
// import PropTypes from 'prop-types'

import remove from 'lodash/remove'

import {
  Accordion,
  AccordionItem,
  AccordionItemPanel,
} from 'react-accessible-accordion'

import CheckboxButtons from '@/elements/CheckboxButtons'

import TargetingLocationsCountry from '@/app/TargetingLocationsCountry'

import { TargetingContext } from '@/app/contexts/TargetingContext'

const TargetingLocationsPicker = () => {
  // Fetch from targeting context
  const {
    locationOptions,
    selectedCities,
    setSelectedCities,
    selectedCountries,
    setSelectedCountries,
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

  // TOGGLE CITIES AND COUNTRIES

  // Turn off all cities connected to a selected country
  React.useEffect(() => {
    selectedCountries.forEach((countryCode) => {
      const country = locationOptions[countryCode]
      const cityCodes = country.cities.map(({ key }) => key)
      const purgedSelectedCities = remove(selectedCities, (city) => !cityCodes.includes(city))
      setSelectedCities(purgedSelectedCities)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountries.length, locationOptions])

  // Turn off country if selecting a city from that country
  React.useEffect(() => {
    selectedCities.forEach((cityCode) => {
      // Related country code
      const { countryCode } = citiesArray.find(({ key }) => key === cityCode)
      const purgedSelectedCountries = remove(selectedCountries, (c) => !c === countryCode)
      setSelectedCountries(purgedSelectedCountries)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCities.length])

  return (
    <section className="pb-20">
      <p className="mb-0">
        <span className="inputLabel__text">
          Locations
        </span>
      </p>
      {/* COUNTRIES AND CITIES */}
      <Accordion
        className="pt-6"
        allowMultipleExpanded
        allowZeroExpanded
      >
        {countriesArray.map((country) => {
          const { key, cities } = country
          const hasCities = !!cities.length
          const citiesCheckboxes = cities.map((city) => {
            const { audiencePercent } = city
            return {
              value: city.key,
              name: city.key,
              label: (
                <>
                  {city.name}
                  &nbsp;&nbsp;
                  {audiencePercent ? (
                    <span className="text-xs">{audiencePercent}%</span>
                  ) : (
                    <span className="text-xs text-red">{'< 1%'}</span>
                  )}
                </>
              ),
            }
          })
          return (
            // COUNTRY
            <AccordionItem key={key} className="mb-10 border-b-2 border-solid border-grey-2">
              <TargetingLocationsCountry
                country={country}
                selectedCountries={selectedCountries}
                setSelectedCountries={setSelectedCountries}
                hasCities={hasCities}
              />
              {/* CITIES */}
              {hasCities && (
                <AccordionItemPanel>
                  <CheckboxButtons
                    className="pt-5 pb-1"
                    buttonOptions={citiesCheckboxes}
                    selectedValues={selectedCities}
                    setSelectedValues={setSelectedCities}
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

// TargetingLocationsPicker.propTypes = {

// }

export default TargetingLocationsPicker
