import React from 'react'
import PropTypes from 'prop-types'

import Link from 'next/link'

import Button from '@/landing/elements/Button'
import brandColors from '@/landing/constants/brandColors'
import copy from '@/landing/copy/LandingPageCopy'

// Global info store
import useGlobalInfoStore from '@/landing/store/globalInfoStore'

import { mixpanelInternalLinkClick } from '@/landing/helpers/mixpanelHelpers'

const getJoinLink = state => state.joinLink
export default function HeroCTA({ classes }) {
  const joinLink = useGlobalInfoStore(getJoinLink)

  return (
    <div className={classes.container}>
      <div className={classes.buttonWrapper}>
        <Link href={joinLink}>
          <Button
            bgColor={brandColors.instagram.bg}
            color={brandColors.white}
            version="large"
            className={classes.button}
            onClick={() => {
              mixpanelInternalLinkClick(joinLink, { location: 'Hero' })
            }}
          >
            {copy.navigation.primaryCTAText}
          </Button>
        </Link>
      </div>
    </div>
  )
}

HeroCTA.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string,
    buttonWrapper: PropTypes.string,
    button: PropTypes.string,
  }).isRequired,
}
