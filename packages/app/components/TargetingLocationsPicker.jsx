import React from 'react'
// import PropTypes from 'prop-types'

import CheckboxButtons from '@/elements/CheckboxButtons'

import { TargetingContext } from '@/app/contexts/TargetingContext'

const TargetingLocationsPicker = () => {
  // Fetch from targeting context
  const {
    locationOptions,
  } = React.useContext(TargetingContext)

  const countriesArray = Object.values(locationOptions)

  const [selectedCities, setSelectedCities] = React.useState([])
  const [selectedCountries, setSelectedCountries] = React.useState([])

  return (
    <section>
      <p className="mb-0">
        <span className="inputLabel__text">
          Locations
        </span>
      </p>
      <ul>
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
            <li key={key}>
              <strong>{name} </strong>
              ({audiencePercent})
              {/* Cities */}
              <CheckboxButtons
                buttonOptions={citiesCheckboxes}
                selectedValues={selectedCities}
                setSelectedValues={setSelectedCities}
              />
            </li>
          )
        })}
      </ul>
    </section>
  )
}

// TargetingLocationsPicker.propTypes = {
  
// }

export default TargetingLocationsPicker
