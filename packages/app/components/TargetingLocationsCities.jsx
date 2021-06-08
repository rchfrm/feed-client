import React from 'react'
import PropTypes from 'prop-types'

import CheckboxButtons from '@/elements/CheckboxButtons'

const TargetingLocationsCities = ({
  cities,
  selectedCities,
  initialCityKeys,
  setSelectedCities,
}) => {
  const citiesCheckboxes = cities.map((city) => {
    const { audience_pct, key } = city
    const percent = audience_pct ? Math.round(audience_pct * 100) : 0
    const initiallyPicked = initialCityKeys.includes(key)
    return {
      value: city.key,
      name: city.key,
      highlight: initiallyPicked,
      label: (
        <>
          {city.name}
          &nbsp;&nbsp;
          {percent ? (
            <span className="text-xs">{percent}%</span>
          ) : (
            <span className="text-xs text-red">{'< 1%'}</span>
          )}
        </>
      ),
    }
  })

  return (
    <div className="pl-8 ml-1">
      <CheckboxButtons
        className="pt-5 pb-1"
        buttonOptions={citiesCheckboxes}
        selectedValues={selectedCities}
        setSelectedValues={setSelectedCities}
        trackGroupLabel="Select City Targeting"
      />
    </div>
  )
}

TargetingLocationsCities.propTypes = {
  cities: PropTypes.array.isRequired,
  selectedCities: PropTypes.array.isRequired,
  initialCityKeys: PropTypes.array.isRequired,
  setSelectedCities: PropTypes.func.isRequired,
}

export default TargetingLocationsCities
