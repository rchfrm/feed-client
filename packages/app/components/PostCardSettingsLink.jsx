import React from 'react'
import PropTypes from 'prop-types'

import LinkIcon from '@/icons/LinkIcon'
import PostLinksSelect from '@/app/PostLinksSelect'

import { setPostLink, defaultPostLinkId } from '@/app/helpers/linksHelpers'
import { removeProtocolFromUrl, enforceUrlProtocol } from '@/helpers/utils'

const PostCardSettingsLink = ({
  postId,
  postIndex,
  linkId,
  linkHref,
  updateLink,
  setError,
  isLinkEditable,
  className,
}) => {
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      {isLinkEditable ? (
        <PostLinksSelect
          // selectClassName={styles.linkSelection__select}
          currentLinkId={linkId || defaultPostLinkId}
          onSelect={setPostLink}
          postItemId={postId}
          onSuccess={({ linkId: newLinkId }) => {
            console.log('newLinkId', newLinkId)
            updateLink(postIndex, newLinkId)
            setError(null)
          }}
          onError={(error) => {
            setError(error)
          }}
          includeDefaultLink
          includeAddLinkOption
          componentLocation="post"
          selectClassName="mb-0"
        />
      ) : (
        <div className="bg-grey-1 pt-3 p-4 rounded-dialogue">
          <p className="mb-0">Link not editable</p>
        </div>
      )}
      {/* LINK PREVIEW */}
      {linkHref && (
        <p className="flex items-center mb-0 mt-2">
          <LinkIcon className="h-3 w-auto mr-2" />
          <a
            className="block pt-1 text-xs text-grey-3 truncate w-full"
            style={{
              transform: 'translateY(-0.05rem)',
            }}
            href={enforceUrlProtocol(linkHref)}
            target="_blank"
            rel="noreferrer noopener"
          >
            {removeProtocolFromUrl(linkHref)}
          </a>
        </p>
      )}
    </div>
  )
}

PostCardSettingsLink.propTypes = {
  postId: PropTypes.string.isRequired,
  postIndex: PropTypes.number.isRequired,
  linkId: PropTypes.string,
  linkHref: PropTypes.string,
  updateLink: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  isLinkEditable: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

PostCardSettingsLink.defaultProps = {
  linkId: '',
  linkHref: '',
  className: null,
}

export default PostCardSettingsLink
