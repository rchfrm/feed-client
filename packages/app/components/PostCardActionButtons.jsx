import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import GearIcon from '@/icons/GearIcon'
import InsightsIcon from '@/icons/InsightsIcon'

import usePostsSidePanel from '@/app/hooks/usePostsSidePanel'

import brandColors from '@/constants/brandColors'

const PostCardActionButtons = ({
  post,
  postIndex,
  postPromotable,
  postToggleSetterType,
  artistId,
  toggleCampaign,
  updatePost,
  hidePaidMetrics,
  isMissingDefaultLink,
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
        disabled={! postPromotable}
        onClick={() => {
          goToPostSettings({
            post,
            postIndex,
            postToggleSetterType,
            updatePost,
            artistId,
            toggleCampaign,
            isMissingDefaultLink,
          })
        }}
        trackComponentName="PostCardActionButtons"
      >
        <GearIcon
          className="h-5 w-auto"
          fill={postPromotable ? brandColors.white : brandColors.greyDark}
        />
      </Button>
      {/* METRICS BUTTON */}
      <Button
        className="h-11 w-1/2 ml-1"
        version="green"
        label="View Metrics"
        onClick={() => {
          const metrics = {
            organic: post.organicMetrics,
            paid: hidePaidMetrics ? null : post.paidMetrics,
          }
          const { postType } = post
          goToPostMetrics({ metrics, postType })
        }}
        trackComponentName="PostCardActionButtons"
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
  postToggleSetterType: PropTypes.string.isRequired,
  artistId: PropTypes.string.isRequired,
  toggleCampaign: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  hidePaidMetrics: PropTypes.bool.isRequired,
  isMissingDefaultLink: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

PostCardActionButtons.defaultProps = {
  className: null,
}

export default PostCardActionButtons
