import React from 'react'
import PropTypes from 'prop-types'

import PostLinksSelect from '@/app/PostLinksSelect'

const PostsSettingsDefaultLink = ({
  defaultLink,
  className,
}) => {
  return (
    <div
      className={[
        'pr-3 block',
        className,
      ].join(' ')}
    >
      <PostLinksSelect
        currentLinkId={defaultLink.id}
        onSelect={() => {}}
      />
    </div>
  )
}

PostsSettingsDefaultLink.propTypes = {
  defaultLink: PropTypes.object.isRequired,
  className: PropTypes.string,
}

PostsSettingsDefaultLink.defaultProps = {
  className: null,
}


export default PostsSettingsDefaultLink
