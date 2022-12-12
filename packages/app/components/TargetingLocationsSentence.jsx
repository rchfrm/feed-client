import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import MarkdownText from '@/elements/MarkdownText'

import * as ROUTES from '@/app/constants/routes'

import copy from '@/app/copy/targetingPageCopy'

const TargetingLocationsSentence = ({
  artistIsMusician,
  spotifyConnected,
  className,
}) => {
  const goToIntegrations = () => {
    Router.push(ROUTES.CONTROLS_INTEGRATIONS)
  }
  return (
    <div className={[className].join(' ')}>
      <MarkdownText markdown={copy.locationsDescription(artistIsMusician, spotifyConnected)} />
      {artistIsMusician && ! spotifyConnected && (
        <div className="text--block text-red">
          <p>
            To include Spotify listener data in your audience, add your Spotify artist profile in
            {' '}
            <a
              role="button"
              style={{ color: 'inherit' }}
              onClick={goToIntegrations}
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
  spotifyConnected: PropTypes.bool,
  className: PropTypes.string,
}

TargetingLocationsSentence.defaultProps = {
  spotifyConnected: false,
  className: null,
}


export default TargetingLocationsSentence
