import React from 'react'
import PropTypes from 'prop-types'

import pull from 'lodash/pull'
import pullAll from 'lodash/pullAll'
import uniq from 'lodash/uniq'

import {
  Accordion,
  AccordionItem,
  AccordionItemPanel,
} from 'react-accessible-accordion'

import TargetingSectionHeader from '@/app/TargetingSectionHeader'
import TargetingLocationsCountry from '@/app/TargetingLocationsCountry'
import TargetingLocationsCities from '@/app/TargetingLocationsCities'

import { TargetingContext } from '@/app/contexts/TargetingContext'

const TargetingLocationsPicker = ({ className }) => {
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
      const countryCityCodes = country.cities.map(({ key }) => key)
      const purgedSelectedCities = pullAll(selectedCities, countryCityCodes)
      setSelectedCities(purgedSelectedCities)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountries, locationOptions])

  // Turn off country if selecting a city from that country
  React.useEffect(() => {
    selectedCities.forEach((cityCode) => {
      // Related country code
      const { countryCode } = citiesArray.find(({ key }) => key === cityCode)
      const purgedSelectedCountries = pull(selectedCountries, countryCode)
      setSelectedCountries(purgedSelectedCountries)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCities])

  // SHOW COUNTRIES THAT HAVE SELECTED CITIES AS OPEN
  const getOpenCountries = () => {
    const openCountries = selectedCities.map((cityKey) => {
      const { countryCode: countryOrigin } = citiesArray.find(({ key }) => key === cityKey)
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
          const { key, cities } = country
          const hasCities = !!cities.length
          return (
            // COUNTRY
            <AccordionItem
              key={key}
              uuid={key}
              className="mb-10 border-b-2 border-solid border-grey-2"
            >
              <TargetingLocationsCountry
                country={country}
                selectedCountries={selectedCountries}
                setSelectedCountries={setSelectedCountries}
                hasCities={hasCities}
              />
              {/* CITIES */}
              {hasCities && (
                <AccordionItemPanel>
                  <TargetingLocationsCities
                    cities={cities}
                    selectedCities={selectedCities}
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

TargetingLocationsPicker.propTypes = {
  className: PropTypes.string,
}

TargetingLocationsPicker.defaultProps = {
  className: null,
}


export default TargetingLocationsPicker
