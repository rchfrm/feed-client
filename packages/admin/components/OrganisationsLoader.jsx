import React from 'react'
import PropTypes from 'prop-types'
import useGetPaginated from '@/admin/hooks/useGetPaginated'
import EntityList from '@/admin/EntityList'
import Entity from '@/admin/Entity'
import ListSearch from '@/admin/elements/ListSearch'

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

  const extraFields = [
    'id',
    'name',
    'artists',
    'users',
  ]

  const serverFunction = isSingleOrg ? 'getOrganisation' : 'getAllOrganisations'
  const fields = [...propsToDisplay, ...extraFields]
  const requestProps = {
    limit: 100,
    fields: fields.join(','),
  }
  const serverFunctionArgs = isSingleOrg ? [orgId, requestProps] : [requestProps]
  const { data: organisations, error, finishedLoading } = useGetPaginated(serverFunction, serverFunctionArgs)

  // FILTER
  // Filtered List
  // const [filteredOrgs, setFilteredOrgs] = React.useState(organisations)
  // TODO Add filter for payment status
  // Search state
  const [searchedOrgs, setSearchedOrgs] = React.useState(organisations)

  // GET DATA ARRAY BASED ON PAGE TYPE
  const orgArray = isSingleOrg ? organisations : searchedOrgs

  if (!orgArray) {
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
  if (isSingleOrg && orgArray.length === 1) {
    return (
      <section className="content">
        <Entity
          entity={orgArray[0]}
          propsToDisplay={propsToDisplay}
        />
      </section>
    )
  }
  return (
    <section className="content">
      {!finishedLoading ? <p>Loading...</p> : <p>Finished loading all organisations</p>}
      <p>Total loaded: {organisations.length}</p>
      <p>Total filtered & searched: {searchedOrgs.length}</p>

      {/* SEARCH */}
      {organisations.length > 1 && (
        <ListSearch
          className="pt-2"
          fullList={organisations}
          updateList={setSearchedOrgs}
        />
      )}

      {/* ORGANISATIONS */}
      <EntityList entities={orgArray} propsToDisplay={propsToDisplay} isSingleEntity={isSingleOrg} />
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
