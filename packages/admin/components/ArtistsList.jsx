import React from 'react'
import PropTypes from 'prop-types'

import AdminGrid from '@/admin/elements/AdminGrid'
import AdminGridItem from '@/admin/elements/AdminGridItem'
import ArtistOverview from '@/admin/ArtistOverview'

const ArtistsList = ({ artists, propsToDisplay, isSingleArtist }) => {
  return (
    <AdminGrid>
      {artists.map((artist) => {
        return (
          <AdminGridItem key={artist.id}>
            <ArtistOverview
              artist={artist}
              key={artist.id}
              propsToDisplay={propsToDisplay}
              isSingleArtist={isSingleArtist}
            />
          </AdminGridItem>
        )
      })}
    </AdminGrid>
  )
}

ArtistsList.propTypes = {
  artists: PropTypes.array.isRequired,
  propsToDisplay: PropTypes.array.isRequired,
  isSingleArtist: PropTypes.bool.isRequired,
}

export default ArtistsList
