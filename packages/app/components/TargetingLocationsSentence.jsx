import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/targetingPageCopy'

const TargetingLocationsSentence = ({ audienceType, hasSpotify, className }) => {
  return (
    <div className={[className].join(' ')}>
      <MarkdownText markdown={copy.locationsDescription(audienceType, hasSpotify)} />
      {audienceType === 'music' && !hasSpotify && (
        <MarkdownText className="text-red" markdown={copy.locationsWarning} />
      )}
    </div>
  )
}

TargetingLocationsSentence.propTypes = {
  audienceType: PropTypes.string,
  hasSpotify: PropTypes.bool,
  className: PropTypes.string,
}

TargetingLocationsSentence.defaultProps = {
  audienceType: 'shop',
  hasSpotify: false,
  className: null,
}


export default TargetingLocationsSentence
