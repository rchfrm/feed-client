import React from 'react'
import PropTypes from 'prop-types'

import CheckboxButtons from '@/elements/CheckboxButtons'

const TargetingPickerCities = ({
  cities,
  selectedCities,
  setSelectedCities,
}) => {
  const citiesCheckboxes = cities.map((city) => {
    const { audience_pct } = city
    return {
      value: city.key,
      name: city.key,
      label: (
        <>
          {city.name}
          &nbsp;&nbsp;
          {audience_pct ? (
            <span className="text-xs">{audience_pct}%</span>
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

TargetingPickerCities.propTypes = {
  cities: PropTypes.array.isRequired,
  selectedCities: PropTypes.array.isRequired,
  setSelectedCities: PropTypes.func.isRequired,
}

export default TargetingPickerCities
