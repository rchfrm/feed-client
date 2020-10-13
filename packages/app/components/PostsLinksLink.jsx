import React from 'react'
import PropTypes from 'prop-types'

import RadioButton from '@/elements/RadioButton'

const PostsLinksLink = ({
  link,
  useSelectDefaultMode,
  className,
  style,
}) => {
  return (
    <li
      className={[
        useSelectDefaultMode ? 'flex' : null,
        className,
      ].join(' ')}
      style={style}
    >
      {useSelectDefaultMode ? (
        <RadioButton
          value={link.name}
          name={link.name}
          label={link.name}
          checked={false}
          onChange={() => {}}
        />
      ) : (
        <span>{link.name}</span>
      )}
    </li>
  )
}

PostsLinksLink.propTypes = {
  link: PropTypes.object.isRequired,
  useSelectDefaultMode: PropTypes.bool.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

PostsLinksLink.defaultProps = {
  className: null,
  style: {},
}


export default PostsLinksLink
