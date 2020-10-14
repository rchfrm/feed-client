import React from 'react'
import PropTypes from 'prop-types'

import LinkIcon from '@/icons/LinkIcon'

import RadioButton from '@/elements/RadioButton'

const PostsLinksLink = ({
  link,
  useSelectMode,
  className,
  style,
}) => {
  return (
    <li
      className={[
        useSelectMode ? 'flex' : null,
        className,
      ].join(' ')}
      style={style}
    >
      {useSelectMode ? (
        <div>
          <RadioButton
            value={link.name}
            name={link.name}
            label={link.name}
            checked={false}
            onChange={() => {}}
          />
          <p className="text-xs text-grey-3 -mt-2 pl-10">
            <a href={link.href} className="flex items-baseline" target="_blank" rel="noreferrer noopener">
              <LinkIcon className="mr-2" />
              preview
            </a>
          </p>
        </div>
      ) : (
        <span>{link.name}</span>
      )}
    </li>
  )
}

PostsLinksLink.propTypes = {
  link: PropTypes.object.isRequired,
  useSelectMode: PropTypes.bool.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

PostsLinksLink.defaultProps = {
  className: null,
  style: {},
}


export default PostsLinksLink
