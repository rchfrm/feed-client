import React from 'react'
import PropTypes from 'prop-types'

import PostsLinksFolder from '@/app/PostsLinksFolder'
import PostsLinksLink from '@/app/PostsLinksLink'

const PostsLinksList = ({ savedLinks }) => {
  console.log('savedLinks', savedLinks)
  return (
    <ul className="text-lg">
      {savedLinks.map((item) => {
        const { type, id } = item
        // LINK
        if (type === 'link') {
          return <PostsLinksLink key={id} link={item} />
        }
        // FOLDER
        return <PostsLinksFolder key={id} folder={item} />
      })}
    </ul>
  )
}

PostsLinksList.propTypes = {
  savedLinks: PropTypes.array.isRequired,
}

export default PostsLinksList
