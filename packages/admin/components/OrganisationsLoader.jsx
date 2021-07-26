import React from 'react'
import PropTypes from 'prop-types'

const OrganisationsLoader = ({ orgId }) => {
  const [loading, setLoading] = React.useState(true)
  if (loading) {
    return (
      <section>
        Loading...
      </section>
    )
  }
  if (orgId) {
    return (
      <section>
        {orgId}
      </section>
    )
  }
  return (
    <section>
      Organisations...
    </section>
  )
}

OrganisationsLoader.propTypes = {
  orgId: PropTypes.string,
}

OrganisationsLoader.defaultProps = {
  orgId: '',
}

export default OrganisationsLoader
