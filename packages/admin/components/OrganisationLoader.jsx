import React from 'react'
import PropTypes from 'prop-types'

const OrganisationLoader = ({ id }) => {
  return (
    <div>
      {id}
    </div>
  )
}

OrganisationLoader.propTypes = {
  id: PropTypes.string.isRequired,
}

export default OrganisationLoader
