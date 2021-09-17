import React from 'react'
import PropTypes from 'prop-types'

import Link from 'next/link'

import Button from '@/elements/Button'

// Global info store
import useGlobalInfoStore from '@/landing/store/globalInfoStore'

import { mixpanelExternalLinkClick } from '@/landing/helpers/mixpanelHelpers'

import * as styles from '@/landing/PrimaryCTA.module.css'

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
            className={[
              'h-auto',
              'w-full',
              'max-w-xs',
              'mx-auto',
              'pt-2',
              'px-8',
              'pb-3',
              'text-3xl',
              'bg-white',
              'text-green',
              'border-solid',
              'border-green',
              'font-display',
              'hover:bg-white',
              'focus:bg-white',
              'focus:shadow-none',
              styles.ctaShadow,
            ].join(' ')}
            onClick={() => {
              mixpanelExternalLinkClick(joinLink, { location: trackingLocation })
            }}
          >
            Sign Up
          </Button>
          {/* <Button */}
          {/*  bgColor={brandColors.white} */}
          {/*  color={brandColors.green} */}
          {/*  border={brandColors.green} */}
          {/*  version="large" */}
          {/* > */}
          {/*  Request Access */}
          {/* </Button> */}
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



