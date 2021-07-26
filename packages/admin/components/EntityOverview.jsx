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

const EntityOverview = ({ entity, propsToDisplay, isSingleEntity }) => {
  const name = entity.name ? entity.name : `${entity.first_name} ${entity.last_name}`
  const users = entity.users && Object.values(entity.users)
  const artists = entity.artists && Object.values(entity.artists)
  // TODO Get artists to return organisations
  const organisations = entity.organizations && Object.values(entity.organizations)

  // const [artistStatus, setArtistsStatus] = React.useState(entity.status)

  return (
    <>
      <SectionHeader header={name} />
      <DataDetail name="ID" value={entity.id} copyText />
      {/* Users */}
      {entity.users && <EntityConnections connections={users} connectionType="User" />}
      {/* Artists */}
      {entity.artists && <EntityConnections connections={artists} connectionType="Artist" />}
      {/* Organisations */}
      {entity.organizations && <EntityConnections connections={organisations} connectionType="Organisation" />}

      <DataDetails propsToDisplay={propsToDisplay} data={entity} />
      {/* /!* Status state and button *!/ */}
      {/* <DataDetail name="Status" value={artistStatus} /> */}
      {/* <ArtistStatusButton */}
      {/*  artistId={entity.id} */}
      {/*  artistStatus={artistStatus} */}
      {/*  setArtistsStatus={setArtistsStatus} */}
      {/* /> */}
      {/* /!* Artist links *!/ */}
      {/* <nav className="pt-5"> */}
      {/*  <h4><strong>Links</strong></h4> */}
      {/*  /!* SINGLE ARTIST PAGE LINK *!/ */}
      {/*  {!isSingleEntity && ( */}
      {/*    <p> */}
      {/*      <Link */}
      {/*        href={{ */}
      {/*          pathname: ROUTES.ARTIST, */}
      {/*          query: { artistId: entity.id }, */}
      {/*        }} */}
      {/*      > */}
      {/*        <a>Artist Page</a> */}
      {/*      </Link> */}
      {/*    </p> */}
      {/*  )} */}
      {/*  /!* TOURNAMENT LINK *!/ */}
      {/*  <p> */}
      {/*    <TournamentLink */}
      {/*      artistId={entity.id} */}
      {/*      buttonText="Artist Tournaments" */}
      {/*      buttonClass="w-40" */}
      {/*      overviewLink */}
      {/*      linkType="anchor" */}
      {/*    /> */}
      {/*  </p> */}
      {/*  /!* INTEGRATION LINKS *!/ */}
      {/*  <ArtistIntegrationLinks */}
      {/*    artistId={entity.id} */}
      {/*    integrations={entity.integrations} */}
      {/*  /> */}
      {/* </nav> */}
      {/* /!* PATCH *!/ */}
      {/* {isSingleEntity && ( */}
      {/*  <PatchArtist */}
      {/*    artistId={entity.id} */}
      {/*    artistName={entity.name} */}
      {/*    integrations={entity.integrations} */}
      {/*  /> */}
      {/* )} */}
    </>
  )
}

EntityOverview.propTypes = {
  entity: PropTypes.object.isRequired,
  propsToDisplay: PropTypes.array.isRequired,
  isSingleEntity: PropTypes.bool.isRequired,
}

export default EntityOverview
