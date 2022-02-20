import React from 'react'
// import PropTypes from 'prop-types'

import PostImage from '@/PostImage'

import ToggleSwitch from '@/elements/ToggleSwitch'

const GetStartedPostsSelectionStep = ({ post, postsState, setPostsState }) => {
  const { id, promotionEnabled } = post
  const [isEnabled, setIsEnabled] = React.useState(promotionEnabled)

  const handleOnchange = () => {
    setIsEnabled(!isEnabled)
    setPostsState({ ...postsState, [post.id]: !isEnabled })
  }

  return (
    <div className="flex flex-column items-center">
      <PostImage
        mediaSrc={post.media}
        mediaType="image"
        thumbnailOptions={post.thumbnails}
        className="w-30 sm:w-40 mx-4 mb-8 pointer-events-none"
      />
      <ToggleSwitch
        state={isEnabled}
        onChange={() => handleOnchange(id)}
      />
    </div>
  )
}

GetStartedPostsSelectionStep.propTypes = {
}

GetStartedPostsSelectionStep.defaultProps = {
}

export default GetStartedPostsSelectionStep
