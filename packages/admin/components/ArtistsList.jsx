import React from 'react'
import PropTypes from 'prop-types'

import ArtistOverview from '@/admin/ArtistOverview'

const ArtistsList = ({ artists }) => {
  return (
    <div>
      {artists.map((artist) => {
        return <ArtistOverview artist={artist} key={artist.id} />
      })}
    </div>
  )
}

ArtistsList.propTypes = {
  artists: PropTypes.array.isRequired,
}

export default ArtistsList
