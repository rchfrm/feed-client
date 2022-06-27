import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import ArrowAltIcon from '@/icons/ArrowAltIcon'
import MarkdownText from '@/elements/MarkdownText'
import brandColors from '@/constants/brandColors'

import * as ROUTES from '@/app/constants/routes'
import copy from '@/app/copy/controlsPageCopy'

const DisabledSection = ({
  children,
  hasTierRestriction,
  section,
  className,
}) => {
  const {
    artist: {
      hasSetUpProfile,
      hasGrowthTier,
    },
  } = React.useContext(ArtistContext)

  const isDisabled = !hasSetUpProfile || hasTierRestriction
  const linkTo = !hasSetUpProfile ? ROUTES.GET_STARTED : ROUTES.BILLING

  return (
    <div className={[className].join(' ')}>
      {isDisabled && (
        <Link href={linkTo}>
          <a className="text-insta -hover--insta no-underline inline-block mb-2">
            <span role="img" aria-label="lock">🔒</span>
            <MarkdownText markdown={copy.disabledReason(section, hasSetUpProfile)} className="mx-2 inline-block underline" />
            <ArrowAltIcon
              className="w-4 h-4 inline-block"
              direction="right"
              fill={brandColors.instagram.bg}
            />
          </a>
        </Link>
      )}
      <div
        className={[isDisabled ? 'pointer-events-none grayscale opacity-20' : null].join(' ')}
      >
        {children}
      </div>
    </div>
  )
}

DisabledSection.propTypes = {
  children: PropTypes.node.isRequired,
  hasTierRestriction: PropTypes.bool,
  section: PropTypes.string.isRequired,
  className: PropTypes.string,
}

DisabledSection.defaultProps = {
  hasTierRestriction: false,
  className: null,
}

export default DisabledSection
