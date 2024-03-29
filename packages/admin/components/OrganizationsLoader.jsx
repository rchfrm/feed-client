import React from 'react'
import PropTypes from 'prop-types'
import useGetPaginated from '@/admin/hooks/useGetPaginated'
import EntityList from '@/admin/EntityList'
import Entity from '@/admin/Entity'
import ListSearch from '@/admin/elements/ListSearch'

const OrganizationsLoader = ({ id }) => {
  const isSingleOrg = !! id

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

  const serverFunction = isSingleOrg ? 'getOrganization' : 'getAllOrganizations'
  const fields = [...propsToDisplay, ...extraFields]
  const requestProps = {
    limit: 100,
    fields: fields.join(','),
  }
  const serverFunctionArgs = isSingleOrg ? [id, requestProps] : [requestProps]
  const { data: organizations, error, finishedLoading } = useGetPaginated(serverFunction, serverFunctionArgs)

  // FILTER
  // Filtered List
  // const [filteredOrgs, setFilteredOrgs] = React.useState(organizations)
  // TODO Add filter for payment status
  // Search state
  const [searchedOrgs, setSearchedOrgs] = React.useState(organizations)

  // GET DATA ARRAY BASED ON PAGE TYPE
  const orgArray = isSingleOrg ? organizations : searchedOrgs

  if (! orgArray) {
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
  if (isSingleOrg) {
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
      {! finishedLoading ? <p>Loading...</p> : <p>Finished loading all organisations</p>}
      <p>Total loaded: {organizations.length}</p>
      <p>Total filtered & searched: {searchedOrgs.length}</p>

      {/* SEARCH */}
      {organizations.length > 1 && (
        <ListSearch
          className="pt-2"
          fullList={organizations}
          updateList={setSearchedOrgs}
        />
      )}

      {/* ORGANIZATIONS */}
      <EntityList entities={orgArray} propsToDisplay={propsToDisplay} isSingleEntity={isSingleOrg} />
    </section>
  )
}

OrganizationsLoader.propTypes = {
  id: PropTypes.string,
}

OrganizationsLoader.defaultProps = {
  id: '',
}

export default OrganizationsLoader
