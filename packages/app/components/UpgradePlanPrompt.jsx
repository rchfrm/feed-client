import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

import ArrowAltIcon from '@/icons/ArrowAltIcon'
import MarkdownText from '@/elements/MarkdownText'
import brandColors from '@/constants/brandColors'
import LockIcon from '@/icons/LockIcon'

import * as ROUTES from '@/app/constants/routes'

const UpgradePlanPrompt = ({
  copy,
  size,
  externalUrl,
  className,
}) => {
  const isSmallSize = size === 'small'

  return (
    <Link
      href={externalUrl || ROUTES.BILLING}
    >
      <a className={['block no-underline', className].join(' ')} target={externalUrl ? '_blank' : null}>
        <div className={[
          'flex items-center',
          isSmallSize ? 'text-xs' : 'p-4 border-2 border-solid border-black rounded-dialogue',
        ].join(' ')}
        >
          <LockIcon
            className={[isSmallSize ? 'w-3 h-3' : 'w-5 h-5'].join(' ')}
            fill={brandColors.instagram.bg}
          />
          <MarkdownText markdown={copy} className={[isSmallSize ? 'underline mx-1' : 'mx-3', 'mb-0'].join(' ')} />
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

UpgradePlanPrompt.propTypes = {
  copy: PropTypes.string.isRequired,
  size: PropTypes.string,
  externalUrl: PropTypes.string,
  className: PropTypes.string,
}

UpgradePlanPrompt.defaultProps = {
  size: 'regular',
  externalUrl: '',
  className: null,
}

export default UpgradePlanPrompt
