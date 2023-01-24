import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Button from '@/elements/Button'
import useGlobalInfoStore from '@/landing/store/globalInfoStore'
import { mixpanelExternalLinkClick } from '@/landing/helpers/mixpanelHelpers'
import * as styles from '@/landing/PrimaryCTA.module.css'
import Section from '@/landing/Section'
import brandColors from '@/constants/brandColors'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

const getJoinLink = (state) => state.joinLink

export default function PrimaryCTA({
  trackingLocation,
}) {
  const joinLink = useGlobalInfoStore(getJoinLink)

  return (
    <Section
      className={[
        styles.primaryCTASection,
      ].join(' ')}
      fullWidth
    >
      <Link href={joinLink}>
        <Button
          className={[
            'h-auto',
            'w-full',
            'max-w-xs',
            'mx-auto',
            'py-3',
            'px-8',
            'text-3xl',
            'bg-offwhite',
            'text-green',
            'border-solid',
            'border-green',
            'font-display',
            'border-4',
            'hover:bg-offwhite',
            'focus:bg-offwhite',
            'focus:shadow-none',
            'my-15',
            styles.ctaShadow,
          ].join(' ')}
          onClick={() => {
            mixpanelExternalLinkClick(joinLink, { location: trackingLocation })
          }}
          trackComponentName="PrimaryCTA"
        >
          Get started
          <ArrowAltIcon
            className="ml-3 h-6"
            fill={brandColors.green}
            direction="right"
          />
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



