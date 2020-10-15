import React from 'react'
import PropTypes from 'prop-types'

import LinkIcon from '@/icons/LinkIcon'

import RadioButton from '@/elements/RadioButton'

const PostsLinksLink = ({
  link,
  editModeOn,
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
        <a
          className={[
            'inline-flex items-baseline',
            editModeOn ? 'wobble-animation no-underline' : null,
          ].join(' ')}
          href={editModeOn ? null : link.href}
          target={editModeOn ? null : '_blank'}
          rel={editModeOn ? null : 'noreferrer noopener'}
          role={editModeOn ? 'button' : null}
        >
          <div
            className="mr-2"
            style={{
              transform: 'translateY(-0.05rem)',
              ...(editModeOn && { opacity: 0 }),
            }}
          >
            <LinkIcon />
          </div>
          {link.name}
        </a>
      )}
    </li>
  )
}

PostsLinksLink.propTypes = {
  link: PropTypes.object.isRequired,
  editModeOn: PropTypes.bool.isRequired,
  useSelectMode: PropTypes.bool.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

PostsLinksLink.defaultProps = {
  className: null,
  style: {},
}


export default PostsLinksLink
