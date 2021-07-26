import React from 'react'
import PropTypes from 'prop-types'
import useGetPaginated from '@/admin/hooks/useGetPaginated'
import EntityList from '@/admin/EntityList'

const OrganisationsLoader = ({ orgId }) => {
  const isSingleOrg = !!orgId

  const serverFunction = isSingleOrg ? 'getOrganisation' : 'getAllOrganisations'
  const serverFunctionArgs = isSingleOrg ? [orgId] : []

  const { data: organisations, error, finishedLoading } = useGetPaginated(serverFunction, serverFunctionArgs)

  if (!finishedLoading) {
    return (
      <section>
        Loading...
      </section>
    )
  }
  if (error) {
    return (
      <section>
        Failed to fetch organisations.
      </section>
    )
  }
  return (
    <section>
      <EntityList entities={organisations} propsToDisplay={[]} isSingleEntity={isSingleOrg} />
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
