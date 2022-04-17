import React from 'react'
import PropTypes from 'prop-types'

import PostCardDummy from '@/app/PostCardDummy'
import PostCardConnectAccounts from '@/app/PostCardConnectAccounts'

import { dummyPosts } from '@/app/helpers/postsHelpers'

const PostsNoArtistsDummyAll = ({ dummyPostsImages, errors, setErrors }) => {
  return (
    <ul
      className={[
        'sm:grid',
        'grid-cols-12',
        'gap-y-10',
        'gap-x-6',
        'grid-flow-row-dense',
        'pt-6',
      ].join(' ')}
    >
      {dummyPosts.map((post, index) => {
        const { image } = dummyPostsImages[index]

        return (
          <React.Fragment key={index}>
            {index === 1 && <PostCardConnectAccounts errors={errors} setErrors={setErrors} />}
            <PostCardDummy post={post} image={image} />
          </React.Fragment>
        )
      })}
    </ul>
  )
}

PostsNoArtistsDummyAll.propTypes = {
  dummyPostsImages: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  errors: PropTypes.array,
  setErrors: PropTypes.func.isRequired,
}

PostsNoArtistsDummyAll.defaultProps = {
  errors: [],
}

export default PostsNoArtistsDummyAll
