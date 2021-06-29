import React from 'react'
import PropTypes from 'prop-types'

import LinkIcon from '@/icons/LinkIcon'
import PostLinksSelect from '@/app/PostLinksSelect'

import useLinksStore from '@/app/stores/linksStore'

import { setPostLink, defaultPostLinkId } from '@/app/helpers/linksHelpers'
import { removeProtocolFromUrl, enforceUrlProtocol, parseUrl } from '@/helpers/utils'
import { track } from '@/app/helpers/trackingHelpers'

const getDefaultLink = state => state.defaultLink

const PostCardSettingsLink = ({
  postId,
  postIndex,
  linkId,
  linkHref,
  linkType,
  postPromotionStatus,
  updatePost,
  setError,
  className,
}) => {
  const defaultLink = useLinksStore(getDefaultLink)
  const [previewUrl, setPreviewUrl] = React.useState(linkHref || defaultLink.href)
  const [currentLinkId, setCurrentLinkId] = React.useState(linkId || defaultPostLinkId)
  const isPostActive = postPromotionStatus === 'active'

  const updateLinkState = React.useCallback(({ postIndex, linkId, linkHref, linkType }) => {
    const payload = {
      postIndex,
      linkId,
      linkHref,
      linkType,
    }
    updatePost('update-link', payload)
  }, [updatePost])

  const handleSuccess = (newLink) => {
    const { linkId, linkHref, linkType } = newLink
    const isDefaultLink = !linkId
    const newLinkId = linkId || defaultPostLinkId
    const newLinkHref = linkHref || defaultLink.href
    updateLinkState({ postIndex, linkId, linkHref, linkType })
    setError(null)
    setPreviewUrl(newLinkHref)
    setCurrentLinkId(newLinkId)
    // TRACK
    const { host: linkDomain } = parseUrl(newLinkHref)
    track('post_link_changed', {
      linkDomain,
      isDefaultLink,
    })
  }

  const handleError = (error) => {
    setError(error)
  }

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <PostLinksSelect
        currentLinkId={currentLinkId}
        linkType={linkType}
        onSelect={setPostLink}
        postItemId={postId}
        onSuccess={handleSuccess}
        onError={handleError}
        includeDefaultLink
        includeAddLinkOption
        componentLocation="post"
        selectClassName="mb-0"
        isPostActive={isPostActive}
      />
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
  linkType: PropTypes.string.isRequired,
  postPromotionStatus: PropTypes.string.isRequired,
  updatePost: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  className: PropTypes.string,
}

PostCardSettingsLink.defaultProps = {
  linkId: '',
  linkHref: '',
  className: null,
}

export default PostCardSettingsLink
