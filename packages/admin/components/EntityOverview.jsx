import React from 'react'
import PropTypes from 'prop-types'

import Link from 'next/link'

import SectionHeader from '@/admin/elements/SectionHeader'
import DataDetails from '@/admin/elements/DataDetails'
import DataDetail from '@/admin/elements/DataDetail'
import EntityConnections from '@/admin/EntityConnections'

import * as ROUTES from '@/admin/constants/routes'

export const getEntityInfo = entity => {
  if (entity?.payment_status) {
    return {
      type: 'organization',
      queryId: 'orgId',
    }
  }
  if (entity?.full_name) {
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
  // eslint-disable-next-line import/namespace
  const pathname = entityInfo.type === 'artist' ? `${ROUTES[entityRoute]}/[id]` : ROUTES[entityRoute]
  // Concatenate first and last name if entity is a user
  const name = entityInfo.type === 'user' ? entity.full_name : entity.name
  // Array of users with access to the artist or organization
  const users = entity.users && Object.values(entity.users)
  // Array of artists connected to user or organization
  const artists = entity.artists && Object.values(entity.artists)
  // Array of organizations connected to user or artist
  let organizations = []
  if (entity?.organization) {
    organizations.push(entity.organization)
  } else if (entity?.organizations) {
    organizations = Object.values(entity.organizations)
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
      {/* Organizations */}
      {organizations.length > 0 && <EntityConnections connections={organizations} connectionType="Organization" />}

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
            pathname,
            query: { id: entity.id },
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
