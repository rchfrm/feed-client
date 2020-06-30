import React from 'react'
import PropTypes from 'prop-types'

const OrganisationLoader = ({ orgId }) => {
  return (
    <div>
      {orgId}
    </div>
  )
}

OrganisationLoader.propTypes = {
  orgId: PropTypes.string.isRequired,
}

export default OrganisationLoader
