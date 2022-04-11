import React from 'react'
import PropTypes from 'prop-types'

const TargetingLocationsSearchResultsItem = ({ location, setSavedLocation }) => {
  const {
    name,
    type,
    region,
    country_code: countryCode,
  } = location

  const saveCustomLocation = async () => {
    setSavedLocation(location)
  }

  return (
    <li className="mb-3 pl-12">
      <button onClick={saveCustomLocation} className="align-left">
        <span className="font-bold underline">{name}</span>, {type === 'city' ? `${region}, ` : null} {countryCode}
      </button>
    </li>
  )
}

TargetingLocationsSearchResultsItem.propTypes = {
  location: PropTypes.object.isRequired,
  setSavedLocation: PropTypes.func.isRequired,
}

TargetingLocationsSearchResultsItem.defaultProps = {
}


export default TargetingLocationsSearchResultsItem
