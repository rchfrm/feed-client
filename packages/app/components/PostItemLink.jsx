import React from 'react'
import PropTypes from 'prop-types'

import { gsap } from 'gsap'

import useBrowserStore from '@/hooks/useBrowserStore'

import PostLinkSummary from '@/app/PostLinkSummary'
import PostLinksSelect from '@/app/PostLinksSelect'

import { setPostLink, defaultPostLinkId } from '@/app/helpers/linksHelpers'

import styles from '@/app/PostItem.module.css'

const PostItemLink = ({
  postId,
  postIndex,
  promotionEnabled,
  promotionStatus,
  linkId,
  linkHref,
  linkType,
  updateLink,
  setError,
}) => {
  // TOGGLE LINK CONTENT
  const [linkPanelOpen, setLinkPanelOpen] = React.useState(false)
  const [isAnimating, setIsAnimating] = React.useState(false)
  const toggleLinkContent = React.useCallback((state) => {
    const newState = typeof state === 'boolean' ? state : !linkPanelOpen
    setIsAnimating(true)
    setLinkPanelOpen(newState)
  }, [linkPanelOpen])
  // DEFINE ELEMENT REFS
  const placeholderEl = React.useRef(null)
  const containerEl = React.useRef(null)
  const topBarEl = React.useRef(null)
  const mainContentEl = React.useRef(null)
  // SETUP GSAP SETTER
  const placeholderSetter = React.useRef(null)
  const transformSetter = React.useRef(null)
  React.useEffect(() => {
    placeholderSetter.current = gsap.quickSetter(placeholderEl.current, 'height', 'px')
    transformSetter.current = gsap.quickSetter(containerEl.current, 'y', 'px')
  }, [])
  // ANIMATE WHEN STATE CHANGES AND RESET ON RESIZE
  const containerHeight = React.useRef(null)
  const topBarHeight = React.useRef(null)
  const contentHeight = React.useRef(null)
  const { width } = useBrowserStore()
  React.useEffect(() => {
    containerHeight.current = containerEl.current.offsetHeight
    topBarHeight.current = topBarEl.current.offsetHeight
    contentHeight.current = mainContentEl.current.offsetHeight
    // Set placeholder height
    placeholderSetter.current(topBarHeight.current)
    // Set transform value
    if (linkPanelOpen && promotionEnabled) transformSetter.current(0)
    else transformSetter.current(contentHeight.current)
  }, [width, linkPanelOpen, promotionEnabled])
  // Toggle is animating state after transition ends
  const initialAnimation = React.useRef(true)
  React.useEffect(() => {
    const animatingEl = containerEl.current
    const animatingOff = () => {
      setIsAnimating(false)
      // After initial animation down, fade in
      if (initialAnimation.current) {
        gsap.to(containerEl.current, { opacity: 1, duration: 0.2 })
        initialAnimation.current = false
      }
    }
    animatingEl.addEventListener('transitionend', animatingOff)
    return () => {
      animatingEl.removeEventListener('transitionend', animatingOff)
    }
  }, [])

  // CAN THE LINK BE EDITED
  const isLinkEditable = promotionStatus !== 'active' && promotionStatus !== 'archived'

  return (
    <>
      {/* Placeholder */}
      <div className="postLinkPlaceholder bg-black" ref={placeholderEl} />
      {/* Links section */}
      <div className={[styles.postLink, styles.postText, 'opacity-0'].join(' ')} ref={containerEl}>
        <div className={[styles.postLinkTopBar, styles.postSection].join(' ')} ref={topBarEl}>
          <PostLinkSummary
            linkPanelOpen={linkPanelOpen}
            isAnimating={isAnimating}
            linkId={linkId}
            linkHref={linkHref}
            linkType={linkType}
          />
          {promotionEnabled && isLinkEditable && (
            <p>
              <a role="button" className={styles.postLinkEditButton} onClick={toggleLinkContent}>
                {linkPanelOpen ? 'Done' : 'Edit'}
              </a>
            </p>
          )}
        </div>
        {/* Link change content */}
        <div className={[styles.postLinkContent, styles.postSection].join(' ')} ref={mainContentEl}>
          <PostLinksSelect
            selectClassName={styles.linkSelection__select}
            currentLinkId={linkId || defaultPostLinkId}
            onSelect={setPostLink}
            postItemId={postId}
            onSuccess={(link) => {
              const { link_id: linkId } = link
              updateLink(postIndex, linkId)
            }}
            onError={(error) => {
              setError(error)
            }}
            includeDefaultLink
            includeAddLinkOption
            componentLocation="post"
          />
        </div>

      </div>
    </>
  )
}

PostItemLink.propTypes = {
  postId: PropTypes.string.isRequired,
  postIndex: PropTypes.number.isRequired,
  promotionEnabled: PropTypes.bool.isRequired,
  promotionStatus: PropTypes.string.isRequired,
  linkId: PropTypes.string,
  linkHref: PropTypes.string,
  linkType: PropTypes.string,
  updateLink: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
}

PostItemLink.defaultProps = {
  linkId: '',
  linkHref: '',
  linkType: '',
}


export default PostItemLink
