import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import ArrowAltIcon from '@/icons/ArrowAltIcon'
import brandColors from '@/constants/brandColors'

import * as ROUTES from '@/app/constants/routes'

const ControlsContentSection = ({ children, action, className }) => {
  const { artist: { hasSetupProfile } } = React.useContext(ArtistContext)

  return (
    <div className={[className].join(' ')}>
      {!hasSetupProfile && (
        <Link href={ROUTES.GET_STARTED}>
          <a className="text-insta no-underline inline-block mb-4">
            <span role="img" aria-label="lock">🔒</span>
            <span className="mx-2 underline">Continue set up to {action}</span>
            <ArrowAltIcon
              className="w-4 h-4 inline-block"
              direction="right"
              fill={brandColors.instagram.bg}
            />
          </a>
        </Link>
      )}
      <div
        className={[!hasSetupProfile ? 'pointer-events-none' : null].join(' ')}
        style={{ ...(!hasSetupProfile && { filter: 'grayscale(100%)', opacity: '20%' }) }}
      >
        {children}
      </div>
    </div>
  )
}

ControlsContentSection.propTypes = {
  children: PropTypes.node.isRequired,
  action: PropTypes.string.isRequired,
  className: PropTypes.string,
}

ControlsContentSection.defaultProps = {
  className: null,
}

export default ControlsContentSection
