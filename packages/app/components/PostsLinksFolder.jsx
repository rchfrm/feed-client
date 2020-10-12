import React from 'react'
import PropTypes from 'prop-types'

import PostsLinksLink from '@/app/PostsLinksLink'

const PostsLinksFolder = ({
  folder,
  className,
}) => {
  return (
    <ul
      className={[
        className,
      ].join(' ')}
    >
      {folder.name}
      {folder.links.map((item) => {
        const { id } = item
        // LINK
        return <PostsLinksLink key={id} link={item} />
      })}
    </ul>
  )
}

PostsLinksFolder.propTypes = {
  folder: PropTypes.object.isRequired,
  className: PropTypes.string,
}

PostsLinksFolder.defaultProps = {
  className: null,
}


export default PostsLinksFolder
