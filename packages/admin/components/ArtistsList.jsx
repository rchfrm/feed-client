import React from 'react'
import PropTypes from 'prop-types'

import AdminGrid from '@/admin/elements/AdminGrid'
import AdminGridItem from '@/admin/elements/AdminGridItem'
import ArtistOverview from '@/admin/ArtistOverview'

const ArtistsList = ({ artists }) => {
  return (
    <AdminGrid>
      {artists.map((artist) => {
        return (
          <AdminGridItem key={artist.id}>
            <ArtistOverview artist={artist} />
          </AdminGridItem>
        )
      })}
    </AdminGrid>
  )
}

ArtistsList.propTypes = {
  artists: PropTypes.array.isRequired,
}

export default ArtistsList
