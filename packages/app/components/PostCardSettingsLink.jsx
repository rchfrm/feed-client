import React from 'react'
import PropTypes from 'prop-types'

import LinkIcon from '@/icons/LinkIcon'
import PostLinksSelect from '@/app/PostLinksSelect'

import useLinksStore from '@/app/store/linksStore'

import { setPostLink, defaultPostLinkId } from '@/app/helpers/linksHelpers'
import { removeProtocolFromUrl, enforceUrlProtocol } from '@/helpers/utils'

const getDefaultLink = state => state.defaultLink

const PostCardSettingsLink = ({
  postId,
  postIndex,
  linkId,
  linkHref,
  postPromotionStatus,
  linkType,
  updateLink,
  setError,
  className,
}) => {
  const defaultLink = useLinksStore(getDefaultLink)
  const [previewUrl, setPreviewUrl] = React.useState(linkHref || defaultLink.href)
  // TEST IF LINK IS EDITABLE
  const isPostActive = postPromotionStatus === 'active'
  const isPostArchived = postPromotionStatus === 'archived'
  const isLinkAdCreative = linkType === 'adcreative'
  const isLinkDisabled = isPostActive || isPostArchived || isLinkAdCreative
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      {isLinkDisabled ? (
        <div>
          <div className="bg-grey-1 pt-3 p-4 rounded-dialogue -mt-2">
            <p className="mb-0">Link not editable</p>
          </div>
        </div>
      ) : (
        <PostLinksSelect
          currentLinkId={linkId || defaultPostLinkId}
          onSelect={setPostLink}
          postItemId={postId}
          onSuccess={(newLink) => {
            const { linkId, linkHref } = newLink
            updateLink({ postIndex, linkId, linkHref })
            setError(null)
            setPreviewUrl(linkHref || defaultLink.href)
          }}
          onError={(error) => {
            setError(error)
          }}
          includeDefaultLink
          includeAddLinkOption
          componentLocation="post"
          selectClassName="mb-0"
        />
      )}
      {/* LINK PREVIEW */}
      {previewUrl && (
        <p className="flex items-center mb-0 mt-2">
          <LinkIcon className="h-3 w-auto mr-2" />
          <a
            className="block pt-1 text-xs text-grey-3 truncate w-full"
            style={{
              transform: 'translateY(-0.05rem)',
            }}
            href={enforceUrlProtocol(previewUrl)}
            target="_blank"
            rel="noreferrer noopener"
          >
            {removeProtocolFromUrl(previewUrl)}
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
  postPromotionStatus: PropTypes.string.isRequired,
  linkType: PropTypes.string.isRequired,
  updateLink: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  className: PropTypes.string,
}

PostCardSettingsLink.defaultProps = {
  linkId: '',
  linkHref: '',
  className: null,
}

export default PostCardSettingsLink
