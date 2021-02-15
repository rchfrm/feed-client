import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import GearIcon from '@/icons/GearIcon'
import LinkIcon from '@/icons/LinkIcon'
import InsightsIcon from '@/icons/InsightsIcon'

import usePostsSidePanel from '@/app/hooks/usePostsSidePanel'

import brandColors from '@/constants/brandColors'

const PostCardActionButtons = ({
  post,
  postIndex,
  postPromotable,
  updateLink,
  hidePaidMetrics,
  isMissingDefaultLink,
  settingsIcon,
  className,
}) => {
  // Get functions to open sidepanel
  const { goToPostSettings, goToPostMetrics } = usePostsSidePanel()
  // RENDER
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
        onClick={() => {
          goToPostSettings({
            post,
            postIndex,
            updateLink,
            isMissingDefaultLink,
          })
        }}
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
        onClick={() => {
          console.log('post', post)
          const metrics = {
            organic: post.organicMetrics,
            paid: hidePaidMetrics ? null : post.paidMetrics,
          }
          goToPostMetrics({ metrics })
        }}
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
  postIndex: PropTypes.number.isRequired,
  postPromotable: PropTypes.bool.isRequired,
  updateLink: PropTypes.func.isRequired,
  hidePaidMetrics: PropTypes.bool.isRequired,
  isMissingDefaultLink: PropTypes.bool.isRequired,
  settingsIcon: PropTypes.string,
  className: PropTypes.string,
}

PostCardActionButtons.defaultProps = {
  settingsIcon: 'gear',
  className: null,
}

export default PostCardActionButtons
