import React from 'react'
import PropTypes from 'prop-types'

import CheckboxButtons from '@/elements/CheckboxButtons'

const TargetingLocationsCities = ({
  cities,
  selectedCities,
  setSelectedCities,
}) => {
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
    <CheckboxButtons
      className="pt-5 pb-1"
      buttonOptions={citiesCheckboxes}
      selectedValues={selectedCities}
      setSelectedValues={setSelectedCities}
    />
  )
}

TargetingLocationsCities.propTypes = {
  cities: PropTypes.array.isRequired,
  selectedCities: PropTypes.array.isRequired,
  setSelectedCities: PropTypes.func.isRequired,
}

export default TargetingLocationsCities
