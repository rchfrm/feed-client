import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import ArrowAltIcon from '@/icons/ArrowAltIcon'
import MarkdownText from '@/elements/MarkdownText'
import LockIcon from '@/icons/LockIcon'

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
          <a className="flex items-center underline mb-5">
            <LockIcon className="w-5 h-5" fill={brandColors.instagram.bg} />
            <MarkdownText markdown={copy.disabledReason(section, hasSetUpProfile)} className="mx-2 mb-0" />
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
