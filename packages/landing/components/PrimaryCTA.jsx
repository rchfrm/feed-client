import React from 'react'
import PropTypes from 'prop-types'

import Link from 'next/link'

import Button from '@/elements/Button'

// Global info store
import useGlobalInfoStore from '@/store/globalInfoStore'

import { mixpanelInternalLinkClick } from '@/helpers/mixpanelHelpers'

import brandColors from '@/constants/brandColors'
import * as styles from '@/PrimaryCTA.module.css'

const getJoinLink = state => state.joinLink

export default function PrimaryCTA({
  trackingLocation,
}) {
  const joinLink = useGlobalInfoStore(getJoinLink)

  return (
    <section
      className={[
        'section--padding',
        'grid',
        'gap-4',
        'grid-cols-12',
        styles.primaryCTASection,
      ].join(' ')}
    >
      <div
        className={[
          'col-span-12',

          'xxs:col-span-8',
          'xxs:col-start-3',

          'xs:col-span-6',
          'xs:col-start-4',

          'sm:col-span-6',
          'sm:col-start-4',

          styles.primaryCTAButtonWrapper,
        ].join(' ')}
      >
        <Link href={joinLink}>
          <Button
            className={styles.primaryCTAButton}
            bgColor={brandColors.white}
            color={brandColors.green}
            border={brandColors.green}
            version="large"
            onClick={() => {
              mixpanelInternalLinkClick(joinLink, { location: trackingLocation })
            }}
          >
            Request Access
          </Button>
        </Link>
      </div>
    </section>
  )
}

PrimaryCTA.propTypes = {
  trackingLocation: PropTypes.string,
}

PrimaryCTA.defaultProps = {
  trackingLocation: 'Primary CTA',
}



