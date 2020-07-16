import React from 'react'
import PropTypes from 'prop-types'

import SectionHeader from '@/admin/elements/SectionHeader'
import DataDetails from '@/admin/elements/DataDetails'
import DataDetail from '@/admin/elements/DataDetail'
import ArtistUsers from '@/admin/ArtistUsers'
import ArtistStatusButton from '@/admin/ArtistStatusButton'
import TournamentLink from '@/admin/TournamentLink'

const getUsersData = (users = {}) => {
  return Object.values(users).map(({ id, name, role }) => {
    return { id, name, role }
  })
}

const ArtistOverview = ({ artist, propsToDisplay }) => {
  const artistUsers = React.useMemo(() => {
    return getUsersData(artist.users)
  }, [artist])

  const [artistStatus, setArtistsStatus] = React.useState(artist.status)

  return (
    <>
      <SectionHeader header={artist.name} />
      <DataDetail name="Artist ID" value={artist.id} copyText />
      {/* Users */}
      <ArtistUsers users={artistUsers} />
      <DataDetails propsToDisplay={propsToDisplay} data={artist} />
      {/* Status state and button */}
      <DataDetail name="Status" value={artistStatus} />
      <ArtistStatusButton
        artistId={artist.id}
        artistStatus={artistStatus}
        setArtistsStatus={setArtistsStatus}
      />
      {/* Artist links */}
      <nav className="pt-5">
        <h4><strong>Links</strong></h4>
        <TournamentLink
          artistId={artist.id}
          buttonText="Artist Tournaments"
          buttonClass="w-40"
          overviewLink
          linkType="anchor"
        />
      </nav>
    </>
  )
}

ArtistOverview.propTypes = {
  artist: PropTypes.object.isRequired,
  propsToDisplay: PropTypes.array.isRequired,
}

export default ArtistOverview
