import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

import ArrowAltIcon from '@/icons/ArrowAltIcon'
import MarkdownText from '@/elements/MarkdownText'
import brandColors from '@/constants/brandColors'

import * as ROUTES from '@/app/constants/routes'

const TierRestrictionMessage = ({
  copy,
  className,
}) => {
  return (
    <Link href={ROUTES.BILLING}>
      <a className={['no-underline', className].join(' ')}>
        <div className={[
          'flex items-center',
          'p-4',
          'border-2 border-solid border-insta rounded-dialogue',
          'text-insta -hover--insta',
        ].join(' ')}
        >
          <span role="img" aria-label="lock">🔒</span>
          <MarkdownText markdown={copy} className="mx-3 mb-0" />
          <ArrowAltIcon
            className="w-5 h-5 flex-shrink-0"
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
  className: PropTypes.string,
}

TierRestrictionMessage.defaultProps = {
  className: null,
}

export default TierRestrictionMessage
