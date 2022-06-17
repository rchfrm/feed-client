import React from 'react'
import PropTypes from 'prop-types'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import PostCardMetrics from '@/app/PostCardMetrics'

const PostInsights = ({ post }) => {
  const { postType, promotionStatus } = post
  const hidePaidMetrics = promotionStatus === 'inactive'
  const isDesktopLayout = useBreakpointTest('sm')

  const metrics = {
    organic: post.organicMetrics,
    paid: hidePaidMetrics ? null : post.paidMetrics,
  }

  return (
    <PostCardMetrics
      metrics={metrics}
      postType={postType}
      shouldShowTitle={isDesktopLayout}
      className="md:pl-16"
    />
  )
}

PostInsights.propTypes = {
  post: PropTypes.object.isRequired,
}

PostInsights.defaultProps = {
}

export default PostInsights