import React from 'react'
// import PropTypes from 'prop-types'

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'


import CheckboxButtons from '@/elements/CheckboxButtons'

import { TargetingContext } from '@/app/contexts/TargetingContext'
import { keyBy } from 'lodash-es'



const TargetingLocationsPicker = () => {
  // Fetch from targeting context
  const {
    locationOptions,
  } = React.useContext(TargetingContext)

  const countriesArray = Object.values(locationOptions)

  const [selectedCities, setSelectedCities] = React.useState([])
  const [selectedCountries, setSelectedCountries] = React.useState([])

  return (
    <section className="pb-20">
      <p className="mb-0">
        <span className="inputLabel__text">
          Locations
        </span>
      </p>
      <Accordion
        className="pt-8"
        allowMultipleExpanded
        allowZeroExpanded
        onChange={(e) => console.log(e)}
      >
        {countriesArray.map((country) => {
          const { key, name, cities, audiencePercent } = country
          const citiesCheckboxes = cities.map((city) => {
            return {
              value: city.key,
              name: city.key,
              label: <em>{city.name}</em>,
            }
          })
          return (
            // Country
            <AccordionItem key={key} className="mb-8">
              <div className="flex">
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
                <AccordionItemHeading className="pb-4">
                  <AccordionItemButton>
                    <p className="mb-0">
                      <strong>{name} </strong>
                      ({audiencePercent})
                    </p>
                  </AccordionItemButton>
                </AccordionItemHeading>
              </div>
              {/* Cities */}
              <AccordionItemPanel>
                <CheckboxButtons
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
