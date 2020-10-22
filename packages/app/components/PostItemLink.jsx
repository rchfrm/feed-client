import React from 'react'
import PropTypes from 'prop-types'

import useAsyncEffect from 'use-async-effect'
import { gsap } from 'gsap'

// IMPORT CONTEXTS
import { ArtistContext } from '@/contexts/ArtistContext'

import useBrowserStore from '@/hooks/useBrowserStore'

import PostLinkSummary from '@/app/PostLinkSummary'
import PostLinksSelect from '@/app/PostLinksSelect'
import PostLinkAddUrl from '@/app/PostLinkAddUrl'

import * as utils from '@/helpers/utils'
import * as server from '@/app/helpers/appServer'
import { setPostLink } from '@/app/helpers/postsHelpers'

import styles from '@/app/PostItem.module.css'

const PostItemLink = ({
  postId,
  postIndex,
  promotionEnabled,
  promotionStatus,
  priorityDsp,
  updateLink,
  setError,
}) => {
  const { artist, addArtistUrl } = React.useContext(ArtistContext)
  const [postLinkPlatform, setPostLinkPlatform] = React.useState(priorityDsp || artist.priority_dsp)
  const storedPostLinkPlatform = React.useRef(postLinkPlatform)
  const postLinkKey = utils.convertPlatformToPriorityDSP(postLinkPlatform)
  const postLinkUrl = artist[postLinkKey]
  // SHOULD THE ADD URL 'ALERT' BE SHOWN
  const [adUrlDialogueOpen, setAdUrlDialogueOpen] = React.useState(false)
  // TOGGLE LINK CONTENT
  const [linkPanelOpen, setLinkPanelOpen] = React.useState(false)
  const [isAnimating, setIsAnimating] = React.useState(false)
  const toggleLinkContent = React.useCallback((state) => {
    const newState = typeof state === 'boolean' ? state : !linkPanelOpen
    setIsAnimating(true)
    setLinkPanelOpen(newState)
  }, [linkPanelOpen])
  // * UPDATE PRIORITY DSP when closing link content
  const [loading, setLoading] = React.useState(false)
  useAsyncEffect(async (isMounted) => {
    const newPlatform = postLinkPlatform
    const previousPlatform = storedPostLinkPlatform.current
    // Stop here if no change in link platform
    if (newPlatform === previousPlatform) return
    // Start loading
    setLoading(true)
    // Update the link platform on the DB
    const updatedAsset = await server.updateAssetLink(artist.id, postId, newPlatform)
      .catch((error) => {
        setError(error)
      })
    // Stop here if not mounted or error
    if (!updatedAsset || !isMounted) return
    // Update stored value in component
    storedPostLinkPlatform.current = newPlatform
    // End loading and clear error
    setLoading(false)
    setError(null)
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
            loading={loading}
            linkPanelOpen={linkPanelOpen}
            isAnimating={isAnimating}
            postLinkPlatform={postLinkPlatform}
            postLinkUrl={postLinkUrl}
          />
          {promotionEnabled && isLinkEditable && (
            <p>
              <a role="button" className={styles.postLinkEditButton} onClick={toggleLinkContent}>
                {linkPanelOpen ? 'Save' : 'Edit'}
              </a>
            </p>
          )}
        </div>
        {/* Link change content */}
        <div className={[styles.postLinkContent, styles.postSection].join(' ')} ref={mainContentEl}>
          <PostLinksSelect
            selectClassName={styles.linkSelection__select}
            currentLinkId="bolognese-recipe"
            onSelect={setPostLink}
            includeDefaultLink
          />
          {/* Show add URL dialogue if triggered */}
          {adUrlDialogueOpen && (
            <PostLinkAddUrl
              postId={postId}
              postIndex={postIndex}
              artist={artist}
              addArtistUrl={addArtistUrl}
              setPostLinkPlatform={setPostLinkPlatform}
              postLinkPlatform={postLinkPlatform}
              storedPostLinkPlatform={storedPostLinkPlatform.current}
              setAdUrlDialogueOpen={setAdUrlDialogueOpen}
              updateLink={updateLink}
            />
          )}
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
  priorityDsp: PropTypes.string,
  updateLink: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
}

PostItemLink.defaultProps = {
  priorityDsp: '',
}


export default PostItemLink
