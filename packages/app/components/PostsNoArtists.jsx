import React from 'react'

import PostCardDummy from '@/app/PostCardDummy'
import PostCardFacebookConnect from '@/app/PostCardFacebookConnect'

import { dummyPosts } from '@/app/helpers/postsHelpers'

const PostsNoArtists = () => {
  return (
    <ul
      className={[
        'sm:grid',
        'grid-cols-12',
        'row-gap-10',
        'col-gap-6',
        'grid-flow-row-dense',
      ].join(' ')}
    >
      {dummyPosts.map((post, index) => {
        return (
          <>
            {index === 1 && <PostCardFacebookConnect key={index + dummyPosts.length} />}
            <PostCardDummy post={post} key={index} />
          </>
        )
      })}
    </ul>
  )
}

PostsNoArtists.propTypes = {
}

PostsNoArtists.defaultProps = {
}

export default PostsNoArtists
