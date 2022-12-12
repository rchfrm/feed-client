import React from 'react'
import PropTypes from 'prop-types'

import ProfileIcon from '@/icons/ProfileIcon'

import brandColors from '@/constants/brandColors'

const ArtistImage = ({ pageId, size, name, className }) => {
  const [src, setSrc] = React.useState('')
  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    if (! pageId) return
    const src = `//graph.facebook.com/${pageId}/picture?type=${size}`
    setSrc(src)
    setError(false)
  }, [pageId, size])

  const onError = () => {
    setError(true)
  }

  if (error || ! pageId) return <ProfileIcon className={className} fill={brandColors.greyDark} />

  return (
    <img className={className} alt={name} src={src} onError={onError} />
  )
}

ArtistImage.propTypes = {
  pageId: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
}

ArtistImage.defaultProps = {
  pageId: '',
  size: 'normal',
  className: '',
}

export default ArtistImage
