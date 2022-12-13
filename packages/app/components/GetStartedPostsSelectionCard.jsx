import React from 'react'
import PropTypes from 'prop-types'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import PostImage from '@/PostImage'
import TickCircleIcon from '@/icons/TickCircleIcon'
import brandColors from '@/constants/brandColors'

const GetStartedPostsSelectionCard = ({
  post,
  postIndex,
  setPosts,
  setError,
  shouldAdjustLayout,
  className,
}) => {
  const { id, promotionEnabled } = post
  const [isEnabled, setIsEnabled] = React.useState(promotionEnabled)

  const isDesktopLayout = useBreakpointTest('sm')

  const handleOnchange = () => {
    setError(null)

    // Update single post state
    setPosts({
      type: 'toggle-promotion',
      payload: {
        postIndex,
        promotionEnabled: ! isEnabled,
      },
    })
  }

  React.useEffect(() => {
    setIsEnabled(promotionEnabled)
  }, [promotionEnabled])

  return (
    <div
      role="button"
      onClick={() => handleOnchange(id)}
      className={['relative self-center rounded-dialogue', className].join(' ')}
      style={{ ...(! shouldAdjustLayout ? { width: isDesktopLayout ? 'calc(20% - 13px)' : 'calc(33% - 6px)' } : { width: 'auto' }) }}
    >
      <PostImage
        mediaSrc={post.media}
        mediaType="image"
        thumbnailOptions={post.thumbnails}
        className="w-full pointer-events-none"
      />
      {! isEnabled && <div className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-75" />}
      <TickCircleIcon
        fill={isEnabled ? brandColors.green : brandColors.white}
        tickFill={isEnabled ? brandColors.white : brandColors.grey}
        className="absolute bottom-0 w-6 h-6 m-2"
      />
    </div>
  )
}

GetStartedPostsSelectionCard.propTypes = {
  post: PropTypes.object.isRequired,
  postIndex: PropTypes.number.isRequired,
  setPosts: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  shouldAdjustLayout: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

GetStartedPostsSelectionCard.defaultProps = {
  className: null,
}

export default GetStartedPostsSelectionCard
