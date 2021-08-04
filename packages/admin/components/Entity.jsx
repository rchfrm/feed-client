import React from 'react'
import EntityOverview, { getEntityInfo } from '@/admin/EntityOverview'
import TournamentLink from '@/admin/TournamentLink'
import ArtistIntegrationLinks from '@/admin/ArtistIntegrationLinks'
import PatchArtist from '@/admin/PatchArtist'

const Entity = ({ entity, propsToDisplay }) => {
  const entityInfo = getEntityInfo(entity)
  return (
    <>
      <EntityOverview entity={entity} propsToDisplay={propsToDisplay} isSingleEntity />
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
