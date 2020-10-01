import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/targetingPageCopy'

const TargetingLocationsSentence = ({
  artistIsMusician,
  hasSpotify,
  className,
}) => {
  return (
    <div className={[className].join(' ')}>
      <MarkdownText markdown={copy.locationsDescription(artistIsMusician, hasSpotify)} />
      {artistIsMusician && !hasSpotify && (
        <MarkdownText className="text-red" markdown={copy.locationsSpotifyWarning} />
      )}
    </div>
  )
}

TargetingLocationsSentence.propTypes = {
  artistIsMusician: PropTypes.bool.isRequired,
  hasSpotify: PropTypes.bool,
  className: PropTypes.string,
}

TargetingLocationsSentence.defaultProps = {
  hasSpotify: false,
  className: null,
}


export default TargetingLocationsSentence
