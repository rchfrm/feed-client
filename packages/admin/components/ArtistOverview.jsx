import React from 'react'
import PropTypes from 'prop-types'

import SectionHeader from '@/admin/elements/SectionHeader'
import DataDetails from '@/admin/elements/DataDetails'
import DataDetail from '@/admin/elements/DataDetail'
import ArtistUsers from '@/admin/ArtistUsers'
import TournamentLink from '@/admin/TournamentLink'

const propsToDisplay = [
  'created_at',
  'currency',
  'country_code',
  'daily_budget',
  'status',
]

const getUsersData = (users) => {
  return Object.values(users).map(({ id, name, role }) => {
    return { id, name, role }
  })
}

const ArtistOverview = ({ artist }) => {
  // console.log('artist', artist)
  const artistUsers = React.useMemo(() => {
    return getUsersData(artist.users)
  }, [artist])

  return (
    <>
      <SectionHeader header={artist.name} />
      <DataDetail name="Artist ID" value={artist.id} copyText />
      {/* Users */}
      <ArtistUsers users={artistUsers} />
      <DataDetails propsToDisplay={propsToDisplay} data={artist} />
      {/* Tournaments link */}
      <p>
        <TournamentLink
          artistId={artist.id}
          buttonText="Tournaments"
          buttonClass="w-40"
          overviewLink
        />
      </p>
    </>
  )
}

ArtistOverview.propTypes = {
  artist: PropTypes.object.isRequired,
}

export default ArtistOverview
