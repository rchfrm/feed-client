import React from 'react'
import EntityOverview, { getEntityInfo } from '@/admin/EntityOverview'
import TournamentLink from '@/admin/TournamentLink'
import ArtistIntegrationLinks from '@/admin/ArtistIntegrationLinks'
import PatchArtist from '@/admin/PatchArtist'
import { useAsync } from 'react-async'
import { getEntityCategory } from '@/admin/helpers/adminServer'

const Category = ({ entityType, id }) => {
  const { data, error, isPending } = useAsync({
    promiseFn: getEntityCategory,
    entityType,
    entityId: id,
  })
  if (isPending) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }
  // TODO Display category information
  // TODO Add ability to update category information
  return <p>{id}</p>
}

const Entity = ({ entity, propsToDisplay }) => {
  const entityInfo = getEntityInfo(entity)
  return (
    <>
      <EntityOverview entity={entity} propsToDisplay={propsToDisplay} isSingleEntity />
      <Category entityType={entityInfo.type} id={entity.id} />
      {entityInfo.type === 'artist' && (
        <>
          {/* LINKS */}
          <h4><strong>Links</strong></h4>

          {/* TOURNAMENTS */}
          <TournamentLink
            artistId={entity.id}
            buttonText="Artist Tournaments"
            buttonClass="w-40"
            overviewLink
            linkType="anchor"
          />

          {/* INTEGRATIONS */}
          <ArtistIntegrationLinks
            artistId={entity.id}
            integrations={entity.integrations}
          />

          {/* PATCH INSTAGRAM BUSINESS ID */}
          <PatchArtist
            artistId={entity.id}
            artistName={entity.name}
            integrations={entity.integrations}
          />
        </>
      )}
    </>
  )
}

export default Entity
