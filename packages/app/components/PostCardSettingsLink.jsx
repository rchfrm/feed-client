import React from 'react'
import PropTypes from 'prop-types'

import LinkIcon from '@/icons/LinkIcon'
import PostLinksSelect from '@/app/PostLinksSelect'

import useControlsStore from '@/app/stores/controlsStore'

import { setPostLink, defaultPostLinkId } from '@/app/helpers/linksHelpers'
import { removeProtocolFromUrl, enforceUrlProtocol, parseUrl } from '@/helpers/utils'
import { track } from '@/helpers/trackingHelpers'
import brandColors from '../../shared/constants/brandColors'

const getDefaultLink = state => state.defaultLink

const PostCardSettingsLink = ({
  postId,
  postIndex,
  linkSpecs,
  postPromotionStatus,
  updatePost,
  setError,
  isDisabled,
  className,
}) => {
  const { linkId, linkHref, linkType } = linkSpecs.all || {}
  const defaultLink = useControlsStore(getDefaultLink)
  const [previewUrl, setPreviewUrl] = React.useState(linkHref || defaultLink.href)
  const [currentLinkId, setCurrentLinkId] = React.useState(linkId || defaultPostLinkId)
  const [currentLinkType, setCurrentLinkType] = React.useState(linkType)
  const isPostActive = postPromotionStatus === 'active'

  const updateLinkState = React.useCallback(({ postIndex, linkSpecs }) => {
    const payload = {
      postIndex,
      linkSpecs,
    }
    updatePost('update-link-specs', payload)
  }, [updatePost])

  const handleSuccess = (newLinkSpecs) => {
    const { linkId, linkHref } = newLinkSpecs.all || {}
    const isDefaultLink = !linkId
    const newLinkId = linkId || defaultPostLinkId
    const newLinkHref = linkHref || defaultLink.href
    updateLinkState({ postIndex, linkSpecs: newLinkSpecs })
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

  React.useEffect(() => {
    const { linkId, linkHref, linkType } = linkSpecs.all || {}
    setCurrentLinkId(linkId)
    setPreviewUrl(linkHref)
    setCurrentLinkType(linkType)
  }, [linkSpecs])

  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <PostLinksSelect
        currentLinkId={currentLinkId}
        linkType={currentLinkType}
        onSelect={setPostLink}
        postItemId={postId}
        onSuccess={handleSuccess}
        onError={handleError}
        includeDefaultLink
        includeAddLinkOption
        componentLocation="post"
        selectClassName="mb-0"
        isPostActive={isPostActive}
        disabled={isDisabled}
      />
      {/* LINK PREVIEW */}
      {previewUrl && (
        <p className="flex items-center mb-0 mt-2">
          <LinkIcon className="h-3 w-auto mr-2" fill={isDisabled ? brandColors.grey : brandColors.textColor} />
          <a
            className={[
              'block pt-1 text-xs truncate w-full text-red',
              isDisabled ? 'text-grey-2 pointer-events-none' : 'text-grey-3',
            ].join(' ')}
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
  linkSpecs: PropTypes.object.isRequired,
  postPromotionStatus: PropTypes.string.isRequired,
  updatePost: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

PostCardSettingsLink.defaultProps = {
  className: null,
}

export default PostCardSettingsLink
