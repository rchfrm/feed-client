import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import useOpenIntegrationsPanel from '@/app/hooks/useOpenIntegrationsPanel'

import copy from '@/app/copy/targetingPageCopy'

const TargetingLocationsSentence = ({
  artistIsMusician,
  spotifyConnected,
  className,
}) => {
  const openIntegrationsPanel = useOpenIntegrationsPanel({})
  return (
    <div className={[className].join(' ')}>
      <MarkdownText markdown={copy.locationsDescription(artistIsMusician, spotifyConnected)} />
      {artistIsMusician && !spotifyConnected && (
        <div className="text--block text-red">
          <p>
            To include Spotify listener data in your audience, add your Spotify artist profile in
            {' '}
            <a
              role="button"
              style={{ color: 'inherit' }}
              onClick={openIntegrationsPanel}
            >
              <strong>Integrations</strong>
            </a>
            .
          </p>
        </div>
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
