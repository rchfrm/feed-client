import React from 'react'
import PropTypes from 'prop-types'

import ArtistOverview from '@/admin/ArtistOverview'

const ArtistsList = ({ artists, propsToDisplay }) => {
  return (
    <div>
      {artists.map((artist) => {
        return <ArtistOverview artist={artist} key={artist.id} propsToDisplay={propsToDisplay} />
      })}
    </div>
  )
}

ArtistsList.propTypes = {
  artists: PropTypes.array.isRequired,
  propsToDisplay: PropTypes.array.isRequired,
}

export default ArtistsList
