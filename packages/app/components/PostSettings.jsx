import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import PostCardSettings from '@/app/PostCardSettings'

const PostSettings = ({ post }) => {
  const { postIndex } = post
  const { artistId } = React.useContext(ArtistContext)

  return (
    <>
      <PostCardSettings
        post={post}
        postIndex={postIndex}
        postToggleSetterType="single"
        artistId={artistId}
        className="md:pl-16"
      />
    </>
  )
}

PostSettings.propTypes = {
  post: PropTypes.object.isRequired,
}

PostSettings.defaultProps = {
}

export default PostSettings
