import React from 'react'
// import PropTypes from 'prop-types'

import PostCardMedia from '@/app/PostCardMedia'

import ToggleSwitch from '@/elements/ToggleSwitch'

const GetStartedPostsSelectionStep = ({ post, setSelectedPosts }) => {
  const [isEnabled, setIsEnabled] = React.useState(true)

  const handleOnchange = () => {
    setIsEnabled(!isEnabled)

    setSelectedPosts(post.id)
  }

  return (
    <div className="flex flex-column items-center">
      <PostCardMedia
        media={post.media}
        thumbnails={post.thumbnails}
        postType={post.postType}
        className="w-30 sm:w-40 mx-4 mb-8"
      />
      <ToggleSwitch
        state={isEnabled}
        onChange={() => handleOnchange(post.id)}
      />
    </div>
  )
}

GetStartedPostsSelectionStep.propTypes = {
}

GetStartedPostsSelectionStep.defaultProps = {
}

export default GetStartedPostsSelectionStep
