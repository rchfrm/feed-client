import React from 'react'
import PropTypes from 'prop-types'

import PostsLinksFolder from '@/app/PostsLinksFolder'
import PostsLinksLink from '@/app/PostsLinksLink'

const PostsLinksList = ({
  savedLinks,
  useSelectDefaultMode,
}) => {
  console.log('savedLinks', savedLinks)
  return (
    <ul className="text-lg">
      {savedLinks.map((item) => {
        const { type, id } = item
        // LINK
        if (type === 'link') {
          return <PostsLinksLink key={id} link={item} useSelectDefaultMode={useSelectDefaultMode} />
        }
        // FOLDER
        return <PostsLinksFolder key={id} folder={item} useSelectDefaultMode={useSelectDefaultMode} />
      })}
    </ul>
  )
}

PostsLinksList.propTypes = {
  savedLinks: PropTypes.array.isRequired,
  useSelectDefaultMode: PropTypes.bool.isRequired,
}


export default PostsLinksList
