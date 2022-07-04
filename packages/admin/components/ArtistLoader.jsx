import React from 'react'
import PropTypes from 'prop-types'
import Error from '@/elements/Error'
import useGetPaginated from '@/admin/hooks/useGetPaginated'
import { InterfaceContext } from '@/contexts/InterfaceContext'
import Entity from '@/admin/Entity'

const ArtistLoader = ({ id }) => {
  const propsToDisplay = [
    'created_at',
    'currency',
    'country_code',
    'daily_budget',
    'last_ad_spend_date',
  ]
  // Define fields
  const extraFields = ['name', 'users', 'status', 'integrations', 'organization', 'preferences']
  const fields = [...propsToDisplay, ...extraFields]
  // Make request
  const serverFunction = 'getArtist'
  const requestProps = {
    limit: 100,
    fields: fields.join(','),
  }
  const serverFunctionArgs = [id, requestProps]
  const { data: artists, error, finishedLoading } = useGetPaginated(serverFunction, serverFunctionArgs)

  // Turn off global loading when finished
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
  React.useEffect(() => {
    if (finishedLoading) {
      toggleGlobalLoading(false)
    }
  }, [finishedLoading, toggleGlobalLoading])


  if (!artists[0]) {
    return (
      <section className="content">
        <p>Loading...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="content">
        <p>Failed to fetch artists.</p>
        <Error error={error} />
      </section>
    )
  }

  return (
    <section className="content">
      <Entity
        entity={artists[0]}
        propsToDisplay={propsToDisplay}
      />
    </section>
  )
}

ArtistLoader.propTypes = {
  id: PropTypes.string.isRequired,
}

export default ArtistLoader
