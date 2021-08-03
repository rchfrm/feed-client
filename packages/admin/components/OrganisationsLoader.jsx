import React from 'react'
import PropTypes from 'prop-types'
import useGetPaginated from '@/admin/hooks/useGetPaginated'
import EntityList from '@/admin/EntityList'

// TODO Enable limits on organizations/all endpoint
// TODO Add filters to ORGANISATIONS page
const OrganisationsLoader = ({ orgId }) => {
  const isSingleOrg = !!orgId

  const propsToDisplay = [
    'billing_enabled',
    'created_at',
    'payment_status',
    'updated_at',
  ]

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
      <EntityList entities={organisations} propsToDisplay={propsToDisplay} isSingleEntity={isSingleOrg} />
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
