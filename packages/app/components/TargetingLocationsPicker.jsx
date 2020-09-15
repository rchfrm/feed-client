import React from 'react'
// import PropTypes from 'prop-types'

import remove from 'lodash/remove'

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from 'react-accessible-accordion'

import ArrowHeadIcon from '@/icons/ArrowHeadIcon'

import CheckboxButtons from '@/elements/CheckboxButtons'

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
      <Accordion
        className="pt-6"
        allowMultipleExpanded
        allowZeroExpanded
      >
        {countriesArray.map((country) => {
          const { key, name, cities, audiencePercent } = country
          const citiesCheckboxes = cities.map((city) => {
            return {
              value: city.key,
              name: city.key,
              label: (
                <>
                  {city.name}
                  &nbsp;&nbsp;
                  <span className="text-xs">{city.audiencePercent}%</span>
                </>
              ),
            }
          })
          return (
            // Country
            <AccordionItem key={key} className="mb-10 border-b-2 border-solid border-grey-2">
              <AccordionItemState>
                {({ expanded }) => (
                  <div className="flex items-top">
                    <CheckboxButtons
                      buttonOptions={[{
                        value: key,
                        name,
                        label: '',
                      }]}
                      selectedValues={selectedCountries}
                      setSelectedValues={setSelectedCountries}
                      checkboxClassname="mb-0"
                    />
                    <AccordionItemHeading
                      className={['w-full', !expanded ? 'pb-2' : null].join(' ')}
                      style={{ transform: 'translateY(-0.1em)' }}
                    >
                      <AccordionItemButton>
                        <div className="flex w-full items-baseline justify-between relative text-lg">
                          <div className="flex items-top">
                            <p className="mb-0"><strong>{name}</strong></p>
                            <ArrowHeadIcon
                              className="ml-2"
                              style={{
                                width: '0.5rem',
                                height: 'auto',
                                transform: expanded ? 'rotate(0deg) translateY(0.08em)' : 'rotate(-90deg) translateX(-0.05em)',
                              }}
                            />
                          </div>
                          <p className="text-xs mb-0">
                            <strong><em>{audiencePercent}% of audience</em></strong>
                          </p>
                        </div>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                  </div>
                )}
              </AccordionItemState>
              {/* Cities */}
              <AccordionItemPanel>
                <CheckboxButtons
                  className="pt-5 pb-1"
                  buttonOptions={citiesCheckboxes}
                  selectedValues={selectedCities}
                  setSelectedValues={setSelectedCities}
                />
              </AccordionItemPanel>
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
