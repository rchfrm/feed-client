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

export default function TryFeed({ className, buttonText, trackLocation }) {
  // Track link before outbound
  const joinLink = useGlobalInfoStore(getJoinLink)

  return (
    <div className={className}>
      <Link href={joinLink}>
        <Button
          className={[
            className,
            'bg-insta hover:bg-insta border-insta hover:border-insta hover:bg-opacity-90 text-offwhite',
          ].join(' ')}
          onClick={() => {
            mixpanelExternalLinkClick(joinLink, { location: trackLocation })
          }}
          trackComponentName="TryFeed"
        >
          {buttonText}
          <ArrowIcon direction="right" fill={brandColors.white} className="ml-1" />
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
