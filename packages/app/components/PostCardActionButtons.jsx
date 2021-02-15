import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import GearIcon from '@/icons/GearIcon'
import LinkIcon from '@/icons/LinkIcon'
import InsightsIcon from '@/icons/InsightsIcon'

import brandColors from '@/constants/brandColors'

const PostCardActionButtons = ({
  post,
  postPromotable,
  settingsIcon,
  className,
}) => {
  return (
    <div
      className={[
        'flex',
        className,
      ].join(' ')}
    >
      {/* SETTINGS BUTTON */}
      <Button
        className="h-11 w-1/2 mr-1"
        version="green"
        label="Edit Settings"
        disabled={!postPromotable}
      >
        {settingsIcon === 'gear' ? (
          <GearIcon
            className="h-5 w-auto"
            fill={brandColors.white}
          />
        ) : (
          <LinkIcon
            className="h-5 w-auto"
            fill={brandColors.white}
          />
        )}
      </Button>
      {/* METRICS BUTTON */}
      <Button
        className="h-11 w-1/2 ml-1"
        version="green"
        label="View Metrix"
      >
        <InsightsIcon
          className="h-5 w-auto"
          fill={brandColors.white}
        />
      </Button>
    </div>
  )
}

PostCardActionButtons.propTypes = {
  post: PropTypes.object.isRequired,
  postPromotable: PropTypes.bool.isRequired,
  settingsIcon: PropTypes.string,
  className: PropTypes.string,
}

PostCardActionButtons.defaultProps = {
  settingsIcon: 'gear',
  className: null,
}

export default PostCardActionButtons
