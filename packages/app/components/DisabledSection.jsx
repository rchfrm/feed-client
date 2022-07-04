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
  hasPlanRestriction,
  section,
  className,
}) => {
  const {
    artist: {
      hasSetUpProfile,
    },
  } = React.useContext(ArtistContext)

  const isDisabled = !hasSetUpProfile || hasPlanRestriction
  const linkTo = !hasSetUpProfile ? ROUTES.GET_STARTED : ROUTES.BILLING

  return (
    <div className={className}>
      {isDisabled && (
        <Link href={linkTo}>
          <a className="flex items-center text-insta -hover--insta no-underline mb-5">
            <span role="img" aria-label="lock">🔒</span>
            <MarkdownText markdown={copy.disabledReason(section, hasSetUpProfile)} className="mx-2 mb-0 underline" />
            <ArrowAltIcon
              className="w-4 h-4 flex-shrink-0"
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
  hasPlanRestriction: PropTypes.bool,
  section: PropTypes.string.isRequired,
  className: PropTypes.string,
}

DisabledSection.defaultProps = {
  hasPlanRestriction: false,
  className: null,
}

export default DisabledSection
