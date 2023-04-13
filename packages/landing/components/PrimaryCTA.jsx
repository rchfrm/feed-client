import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Button from '@/elements/Button'
import useGlobalInfoStore from '@/landing/store/globalInfoStore'
import { mixpanelExternalLinkClick } from '@/landing/helpers/mixpanelHelpers'
import Section from '@/landing/Section'
import ArrowIcon from '@/icons/ArrowIcon'

const getJoinLink = (state) => state.joinLink

export default function PrimaryCTA({
  trackingLocation,
}) {
  const joinLink = useGlobalInfoStore(getJoinLink)

  return (
    <Section className="flex justify-center">
      <Link href={joinLink} className="no-underline">
        <Button
          type="large"
          version="primary"
          onClick={() => {
            mixpanelExternalLinkClick(joinLink, { location: trackingLocation })
          }}
          trackComponentName="PrimaryCTA"
        >
          Start a campaign
        </Button>
      </Link>
    </Section>
  )
}

PrimaryCTA.propTypes = {
  trackingLocation: PropTypes.string,
}

PrimaryCTA.defaultProps = {
  trackingLocation: 'Primary CTA',
}



