import React from 'react'
import PropTypes from 'prop-types'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import PostImage from '@/PostImage'
import TickCircleIcon from '@/icons/TickCircleIcon'
import brandColors from '@/constants/brandColors'


const GetStartedPostsSelectionCard = ({ post, postsState, setPostsState }) => {
  const isDesktopLayout = useBreakpointTest('sm')
  const { id, promotionEnabled } = post
  const [isEnabled, setIsEnabled] = React.useState(promotionEnabled)

  const handleOnchange = () => {
    setIsEnabled(!isEnabled)
    setPostsState({ ...postsState, [post.id]: !isEnabled })
  }

  return (
    <div
      role="button"
      onClick={() => handleOnchange(id)}
      className="relative self-center rounded-dialogue"
      style={{ width: isDesktopLayout ? 'calc(20% - 12px)' : 'calc(33% - 6px)' }}
    >
      <PostImage
        mediaSrc={post.media}
        mediaType="image"
        thumbnailOptions={post.thumbnails}
        className="w-full pointer-events-none"
      />
      <TickCircleIcon
        fill={isEnabled ? brandColors.green : brandColors.white}
        tickFill={isEnabled ? brandColors.white : brandColors.grey}
        className="absolute bottom-0 w-6 h-6 m-2"
      />
      {!isEnabled && <div className="absolute w-full h-full top-0 left-0 bg-grey-2 opacity-75 rounded-dialogue" />}
    </div>
  )
}

GetStartedPostsSelectionCard.propTypes = {
  post: PropTypes.object.isRequired,
  postsState: PropTypes.object.isRequired,
  setPostsState: PropTypes.func.isRequired,
}

GetStartedPostsSelectionCard.defaultProps = {
}

export default GetStartedPostsSelectionCard
