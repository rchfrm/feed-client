import React from 'react'
import PropTypes from 'prop-types'

const PostsLinksEditModal = ({ link }) => {
  return (
    <div>
      Edit link
      {link && link.name}
    </div>
  )
}

PostsLinksEditModal.propTypes = {
  link: PropTypes.object,
}

PostsLinksEditModal.defaultProps = {
  link: null,
}


export default PostsLinksEditModal
