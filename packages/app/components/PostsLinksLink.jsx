import React from 'react'
import PropTypes from 'prop-types'

const PostsLinksLink = ({
  link,
  className,
}) => {
  return (
    <li
      className={[
        className,
      ].join(' ')}
    >
      {link.name}
    </li>
  )
}

PostsLinksLink.propTypes = {
  link: PropTypes.object.isRequired,
  className: PropTypes.string,
}

PostsLinksLink.defaultProps = {
  className: null,
}


export default PostsLinksLink
