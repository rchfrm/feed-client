import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/targetingPageCopy'

const TargetingLocationsSentence = ({
  artistIsMusician,
  spotifyConnected,
  className,
}) => {
  return (
    <div className={[className].join(' ')}>
      <MarkdownText markdown={copy.locationsDescription(artistIsMusician, spotifyConnected)} />
      {artistIsMusician && !spotifyConnected && (
        <MarkdownText className="text-red" markdown={copy.locationsSpotifyWarning} />
      )}
    </div>
  )
}

TargetingLocationsSentence.propTypes = {
  artistIsMusician: PropTypes.bool.isRequired,
  spotifyConnected: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

TargetingLocationsSentence.defaultProps = {
  className: null,
}


export default TargetingLocationsSentence
