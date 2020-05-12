import React from 'react'
import PropTypes from 'prop-types'

const ArtistImage = ({ pageId, size, name, className }) => {
  const src = `//graph.facebook.com/${pageId}/picture?type=${size}`
  return (
    <img className={className} alt={name} src={src} />
  )
}

ArtistImage.propTypes = {
  pageId: PropTypes.string.isRequired,
  size: PropTypes.string,
  className: PropTypes.string,
}

ArtistImage.defaultProps = {
  className: '',
  size: 'normal',
}

export default ArtistImage
