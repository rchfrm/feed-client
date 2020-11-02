import React from 'react'
import PropTypes from 'prop-types'

import LinkIcon from '@/icons/LinkIcon'

import useCreateEditPostsLink from '@/app/hooks/useCreateEditPostsLink'

import RadioButton from '@/elements/RadioButton'

import { removeProtocolFromUrl } from '@/helpers/utils'

const PostsLinksLink = ({
  link,
  isDefault,
  editModeOn,
  setEditModeOn,
  useSelectMode,
  className,
  style,
}) => {
  // FUNCTION FOR EDITING LINKS
  const editLink = useCreateEditPostsLink({
    action: 'edit',
    itemType: 'link',
    onSave: () => setEditModeOn(false),
  })

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
        <p className="mb-0">
          <a
            className={[
              'inline-flex items-baseline no-underline',
              editModeOn ? 'wobble-animation' : null,
            ].join(' ')}
            role="button"
            onClick={editModeOn ? () => editLink(link) : () => {}}
          >
            <span
              className="inline-block mr-2"
              style={{
                transform: 'translateY(-0.1rem)',
              }}
            >
              <LinkIcon />
            </span>
            {link.name}
            {isDefault && (
              <span className="flex text-green pl-2 text-sm">
                <strong className="pr-1" style={{ transform: 'translateY(0.2em)' }}>*</strong>
                <strong>default link</strong>
              </span>
            )}
          </a>
          <a
            className="block pt-1 text-xs text-grey-3"
            href={editModeOn ? null : link.href}
            target={editModeOn ? null : '_blank'}
            rel={editModeOn ? null : 'noreferrer noopener'}
            role={editModeOn ? 'button' : null}
            onClick={editModeOn ? () => editLink(link) : () => {}}
          >
            {removeProtocolFromUrl(link.href)}
          </a>
        </p>
      )}
    </li>
  )
}

PostsLinksLink.propTypes = {
  link: PropTypes.object.isRequired,
  isDefault: PropTypes.bool,
  editModeOn: PropTypes.bool.isRequired,
  setEditModeOn: PropTypes.func.isRequired,
  useSelectMode: PropTypes.bool.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

PostsLinksLink.defaultProps = {
  isDefault: false,
  className: null,
  style: {},
}


export default PostsLinksLink
