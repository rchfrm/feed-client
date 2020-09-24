import React from 'react'
import PropTypes from 'prop-types'

import pullAll from 'lodash/pullAll'
import uniq from 'lodash/uniq'

import {
  Accordion,
  AccordionItem,
  AccordionItemPanel,
} from 'react-accessible-accordion'

import TargetingSectionHeader from '@/app/TargetingSectionHeader'
import TargetingPickerCountry from '@/app/TargetingPickerCountry'
import TargetingPickerCities from '@/app/TargetingPickerCities'

import { TargetingContext } from '@/app/contexts/TargetingContext'

const TargetingPickerLocations = ({
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
    const citiesToPurge = selectedCountries.reduce((arr, code) => {
      const country = locationOptions[code]
      const cityKeys = country.cities.map(({ key }) => key)
      return [...arr, ...cityKeys]
    }, [])
    const purgedCities = pullAll(selectedCities, citiesToPurge)
    setSelectedCities([...purgedCities])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountries, locationOptions])

  // Turn off country if selecting a city from that country
  React.useEffect(() => {
    const countriesToPurge = selectedCities.map((cityCode) => {
      // Related country code
      const { country_code } = citiesArray.find(({ key }) => key === cityCode)
      return country_code
    })
    const purgedSelectedCountries = pullAll(selectedCountries, uniq(countriesToPurge))
    setSelectedCountries(purgedSelectedCountries)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCities])

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
      <TargetingSectionHeader className="mb-3" header="Locations" />
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
              <TargetingPickerCountry
                country={country}
                selectedCountries={selectedCountries}
                setSelectedCountries={setSelectedCountries}
                hasCities={hasCities}
                initiallyPicked={initiallyPicked}
              />
              {/* CITIES */}
              {hasCities && (
                <AccordionItemPanel>
                  <TargetingPickerCities
                    cities={cities}
                    selectedCities={selectedCities}
                    initialCityKeys={initialCityKeys}
                    setSelectedCities={setSelectedCities}
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

TargetingPickerLocations.propTypes = {
  initialCityKeys: PropTypes.array.isRequired,
  initialCountryCodes: PropTypes.array.isRequired,
  className: PropTypes.string,
}

TargetingPickerLocations.defaultProps = {
  className: null,
}


export default TargetingPickerLocations
