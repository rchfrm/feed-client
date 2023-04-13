import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Button from '@/elements/Button'
import copy from '@/landing/copy/LandingPageCopy'
import ArrowIcon from '@/icons/ArrowIcon'
import { mixpanelExternalLinkClick } from '@/landing/helpers/mixpanelHelpers'
import useGlobalInfoStore from '@/landing/store/globalInfoStore'
import brandColors from '@/constants/brandColors'

const getJoinLink = (state) => state.joinLink

export default function TryFeed({ className, trackLocation, buttonText }) {
  // Track link before outbound
  const joinLink = useGlobalInfoStore(getJoinLink)

  return (
    <div className={className}>
      <Link href={joinLink} className="no-underline">
        <Button
          size="large"
          className={className}
          onClick={() => {
            mixpanelExternalLinkClick(joinLink, { location: trackLocation })
          }}
          trackComponentName="TryFeed"
        >
          {buttonText}
        </Button>
      </Link>
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
