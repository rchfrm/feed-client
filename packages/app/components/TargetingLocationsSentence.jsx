import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/targetingPageCopy'

import * as artistHelpers from '@/app/helpers/artistHelpers'

const TargetingLocationsSentence = ({
  artistCategories,
  hasSpotify,
  className,
}) => {
  const isMusician = artistHelpers.testIfMusician(artistCategories)
  return (
    <div className={[className].join(' ')}>
      <MarkdownText markdown={copy.locationsDescription(isMusician, hasSpotify)} />
      {isMusician && !hasSpotify && (
        <MarkdownText className="text-red" markdown={copy.locationsSpotifyWarning} />
      )}
    </div>
  )
}

TargetingLocationsSentence.propTypes = {
  artistCategories: PropTypes.array.isRequired,
  hasSpotify: PropTypes.bool,
  className: PropTypes.string,
}

TargetingLocationsSentence.defaultProps = {
  hasSpotify: false,
  className: null,
}


export default TargetingLocationsSentence
