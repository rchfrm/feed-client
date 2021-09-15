import React from 'react'
import PropTypes from 'prop-types'

import Link from 'next/link'

import Button from '@/elements/Button'
import copy from '@/copy/LandingPageCopy'
import brandColors from '@/constants/brandColors'

import { mixpanelInternalLinkClick } from '@/helpers/mixpanelHelpers'

// Global info store
import useGlobalInfoStore from '@/store/globalInfoStore'

const getJoinLink = state => state.joinLink

export default function TryFeed({ className, buttonText, trackLocation }) {
  // Track link before outbound
  const joinLink = useGlobalInfoStore(getJoinLink)

  return (
    <div className={className}>
      <Link href={joinLink}>
        <Button
          color={brandColors.white}
          bgColor={brandColors.instagram.bg}
          onClick={() => {
            mixpanelInternalLinkClick(joinLink, { location: trackLocation })
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
