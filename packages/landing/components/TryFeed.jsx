import React from 'react'
import PropTypes from 'prop-types'

import Link from 'next/link'

import Button from '@/elements/Button'
import copy from '@/landing/copy/LandingPageCopy'
import brandColors from '@/landing/constants/brandColors'

import { mixpanelExternalLinkClick, mixpanelInternalLinkClick } from '@/landing/helpers/mixpanelHelpers'

// Global info store
import useGlobalInfoStore from '@/landing/store/globalInfoStore'

const getJoinLink = state => state.joinLink

export default function TryFeed({ className, buttonText, trackLocation }) {
  // Track link before outbound
  const joinLink = useGlobalInfoStore(getJoinLink)

  return (
    <div className={className}>
      <Link href={joinLink}>
        <Button
          version="pink"
          onClick={() => {
            mixpanelExternalLinkClick(joinLink, { location: trackLocation })
          }}
        >
          {buttonText}
        </Button>
      </Link>
    </div>
  )
}

TryFeed.propTypes = {
  className: PropTypes.string,
  buttonText: PropTypes.string,
  trackLocation: PropTypes.string,
}

TryFeed.defaultProps = {
  className: null,
  buttonText: copy.navigation.primaryCTAText,
  trackLocation: '',
}
