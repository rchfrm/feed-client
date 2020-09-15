import React from 'react'
// import PropTypes from 'prop-types'

import { TargetingContext } from '@/app/contexts/TargetingContext'

const TargetingLocationsPicker = () => {
  // Fetch from targeting context
  const {
    locationOptions,
  } = React.useContext(TargetingContext)

  const countriesArray = Object.values(locationOptions)

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
          return (
            // Country
            <li key={key}>
              <strong>{name} </strong>
              ({audiencePercent})
              {/* Cities */}
              <ul>
                {cities.map((city) => {
                  const { key, name, audiencePercent } = city
                  return (
                    <li key={key}>{name} ({audiencePercent})</li>
                  )
                })}
              </ul>
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
