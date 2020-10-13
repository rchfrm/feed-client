import React from 'react'
import PropTypes from 'prop-types'

const PostsLinksLink = ({
  link,
  className,
  style,
}) => {
  return (
    <li
      className={[
        className,
      ].join(' ')}
      style={style}
    >
      {link.name}
    </li>
  )
}

PostsLinksLink.propTypes = {
  link: PropTypes.object.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

PostsLinksLink.defaultProps = {
  className: null,
  style: {},
}


export default PostsLinksLink
