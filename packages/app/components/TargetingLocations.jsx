import React from 'react'
import PropTypes from 'prop-types'

import TargetingSectionHeader from '@/app/TargetingSectionHeader'
import TargetingLocationsSentence from '@/app/TargetingLocationsSentence'
import TargetingLocationsSettings from '@/app/TargetingLocationsSettings'
import TargetingLocationsPicker from '@/app/TargetingLocationsPicker'
import TargetingLocationsSearch from '@/app/TargetingLocationsSearch'

import { TargetingContext } from '@/app/contexts/TargetingContext'

const TargetingLocations = ({
  initialCityKeys,
  initialCountryCodes,
  className,
}) => {
  // Fetch from targeting context
  const {
    artistIsMusician,
    spotifyConnected,
  } = React.useContext(TargetingContext)

  return (
    <section className={[className].join(' ')}>
      {/* INTRO */}
      <TargetingSectionHeader className="mb-5" header="Locations" />
      <TargetingLocationsSentence
        artistIsMusician={artistIsMusician}
        spotifyConnected={spotifyConnected}
      />
      {/* AUDIENCE SETTINGS */}
      <TargetingLocationsSettings className="pt-4  mb-4" />
      {/* COUNTRIES AND CITIES PICKER */}
      <TargetingLocationsPicker
        initialCityKeys={initialCityKeys}
        initialCountryCodes={initialCountryCodes}
      />
      <TargetingLocationsSearch />
    </section>
  )
}

TargetingLocations.propTypes = {
  initialCityKeys: PropTypes.array,
  initialCountryCodes: PropTypes.array,
  className: PropTypes.string,
}

TargetingLocations.defaultProps = {
  initialCityKeys: [],
  initialCountryCodes: [],
  className: null,
}


export default TargetingLocations
