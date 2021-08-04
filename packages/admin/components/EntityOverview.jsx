import React from 'react'
import PropTypes from 'prop-types'

import Link from 'next/link'

import SectionHeader from '@/admin/elements/SectionHeader'
import DataDetails from '@/admin/elements/DataDetails'
import DataDetail from '@/admin/elements/DataDetail'
import EntityConnections from '@/admin/EntityConnections'
import ArtistStatusButton from '@/admin/ArtistStatusButton'
import TournamentLink from '@/admin/TournamentLink'
import ArtistIntegrationLinks from '@/admin/ArtistIntegrationLinks'
import PatchArtist from '@/admin/PatchArtist'

import * as ROUTES from '@/admin/constants/routes'
import UserArtists from '@/admin/UserArtists'

const getUsersData = (users = {}) => {
  return Object.values(users).map(({ id, name, role }) => {
    return { id, name, role }
  })
}

export const getEntityInfo = entity => {
  if (entity?.payment_status) {
    return {
      type: 'organisation',
      queryId: 'orgId',
    }
  } if (entity?.first_name) {
    return {
      type: 'user',
      queryId: 'userId',
    }
  }
  return {
    type: 'artist',
    queryId: 'artistId',
  }
}

const EntityOverview = ({ entity, propsToDisplay, isSingleEntity }) => {
  const entityInfo = getEntityInfo(entity)
  const entityRoute = entityInfo.type.toUpperCase()
  // Concatenate first and last name if entity is a user
  const name = entityInfo.type === 'user' ? `${entity.first_name} ${entity.last_name}` : entity.name
  // Array of users with access to the artist or organisation
  const users = entity.users && Object.values(entity.users)
  // Array of artists connected to user or organisation
  const artists = entity.artists && Object.values(entity.artists)
  // Array of organisations connected to user or artist
  let organisations = []
  if (entity?.organization) {
    organisations.push(entity.organization)
  } else if (entity?.organizations) {
    organisations = Object.values(entity.organizations)
  }
  // Translate artist campaign status to string
  const campaignStatus = entity.preferences?.targeting?.status

  return (
    <>
      <SectionHeader header={name} />

      <DataDetail name="ID" value={entity.id} copyText />

      {/* Users */}
      {entity.users && <EntityConnections connections={users} connectionType="User" />}
      {/* Artists */}
      {entity.artists && <EntityConnections connections={artists} connectionType="Artist" />}
      {/* Organisations */}
      {organisations.length > 0 && <EntityConnections connections={organisations} connectionType="Organisation" />}

      <DataDetails propsToDisplay={propsToDisplay} data={entity} />

      {/* Artist activation and promotion status */}
      {entityInfo.type === 'artist' && (
        <>
          <DataDetail name="Activation Status" value={entity.status} />
          <DataDetail name="Campaign Status" value={campaignStatus === 1 ? 'active' : 'paused'} />
        </>
      )}

      {/* Link to single entity page */}
      {!isSingleEntity && (
        <Link
          href={{
            // eslint-disable-next-line import/namespace
            pathname: ROUTES[entityRoute],
            query: { [entityInfo.queryId]: entity.id },
          }}
        >
          <a className="capitalize">{entityInfo.type} Page</a>
        </Link>
      )}
    </>
  )
}

EntityOverview.propTypes = {
  entity: PropTypes.object.isRequired,
  propsToDisplay: PropTypes.array.isRequired,
  isSingleEntity: PropTypes.bool.isRequired,
}

export default EntityOverview
