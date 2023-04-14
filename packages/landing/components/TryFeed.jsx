import React from 'react'
import PropTypes from 'prop-types'
import Button from '@/elements/Button'
import { mixpanelExternalLinkClick } from '@/landing/helpers/mixpanelHelpers'

export default function TryFeed({ className, trackLocation, buttonText }) {
  // Track link before outbound
  const joinLink = 'https://app.tryfeed.co/join'

  return (
    <div className={className}>
      <Button
        className={[
          'w-full',
          'h-full',
        ].join(' ')}
        onClick={() => {
          mixpanelExternalLinkClick(joinLink, { location: trackLocation })
        }}
        trackComponentName="TryFeed"
      >
        {buttonText}
      </Button>
    </div>
  )
}

TryFeed.propTypes = {
  className: PropTypes.string,
  trackLocation: PropTypes.string,
  buttonText: PropTypes.string,
}

TryFeed.defaultProps = {
  className: null,
  trackLocation: '',
  buttonText: 'Sign up',
}
