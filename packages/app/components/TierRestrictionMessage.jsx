import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

import ArrowAltIcon from '@/icons/ArrowAltIcon'
import MarkdownText from '@/elements/MarkdownText'
import brandColors from '@/constants/brandColors'

import * as ROUTES from '@/app/constants/routes'

const TierRestrictionMessage = ({
  copy,
  size,
  className,
}) => {
  const isSmallSize = size === 'small'
  return (
    <Link href={ROUTES.BILLING}>
      <a className={['block no-underline', className].join(' ')}>
        <div className={[
          'flex items-center',
          isSmallSize ? 'text-xs' : 'p-4 border-2 border-solid border-insta rounded-dialogue',
          'text-insta -hover--insta',
        ].join(' ')}
        >
          <span role="img" aria-label="lock">🔒</span>
          <MarkdownText markdown={copy} className={[isSmallSize ? 'underline mx-2' : 'mx-3', 'mb-0'].join(' ')} />
          <ArrowAltIcon
            className={[isSmallSize ? 'w-3 h-3' : 'w-5 h-5', 'flex-shrink-0'].join(' ')}
            direction="right"
            fill={brandColors.instagram.bg}
          />
        </div>
      </a>
    </Link>
  )
}

TierRestrictionMessage.propTypes = {
  copy: PropTypes.string.isRequired,
  size: PropTypes.string,
  className: PropTypes.string,
}

TierRestrictionMessage.defaultProps = {
  size: 'regular',
  className: null,
}

export default TierRestrictionMessage
