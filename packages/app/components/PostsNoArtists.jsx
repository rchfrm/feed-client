import React from 'react'

import PostCardDummy from '@/app/PostCardDummy'

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
      {[...Array(6)].map((index) => {
        return (
          <PostCardDummy key={index} />
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
