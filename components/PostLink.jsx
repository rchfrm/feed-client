import React from 'react'
import PropTypes from 'prop-types'

import { gsap } from 'gsap'

// IMPORT CONTEXTS
import { ArtistContext } from '@/contexts/Artist'

import useBrowserStore from '@/hooks/useBrowserStore'

import PostLinkOptions from '@/PostLinkOptionsNew'
import PostLinkAddUrl from '@/PostLinkAddUrl'

import LinkIcon from '@/icons/LinkIcon'

import * as utils from '@/helpers/utils'
import brandColors from '@/constants/brandColors'

import styles from '@/PostItem.module.css'

const PostLink = ({ postId, postIndex, priorityDsp, updateLink, setError }) => {
  const { artist } = React.useContext(ArtistContext)
  const [postLinkPlatform, setPostLinkPlatform] = React.useState(priorityDsp || artist.priority_dsp)
  const postLinkKey = utils.convertPlatformToPriorityDSP(postLinkPlatform)
  const postLinkUrl = artist[postLinkKey]
  // SHOULD THE ADD URL 'ALERT' BE SHOWN
  const [addUrl, setAddUrl] = React.useState(false)
  // TOGGLE LINK CONTENT
  const [linkPanelOpen, setLinkPanelOpen] = React.useState(false)
  const toggleLinkContent = React.useCallback((state) => {
    const newState = typeof state === 'boolean' ? state : !linkPanelOpen
    setLinkPanelOpen(newState)
  }, [linkPanelOpen])
  // Define element refs
  const placeholderEl = React.useRef(null)
  const containerEl = React.useRef(null)
  const topBarEl = React.useRef(null)
  const mainContentEl = React.useRef(null)
  // Setup GSAP setter
  const placeholderSetter = React.useRef(null)
  const transformSetter = React.useRef(null)
  React.useEffect(() => {
    placeholderSetter.current = gsap.quickSetter(placeholderEl.current, 'height', 'px')
    transformSetter.current = gsap.quickSetter(containerEl.current, 'y', 'px')
  }, [])
  // Reset transform on resize
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
    if (linkPanelOpen) transformSetter.current(0)
    else transformSetter.current(contentHeight.current)
  }, [width, linkPanelOpen])

  return (
    <>
      {/* Placeholder */}
      <div className="postLinkPlaceholder" ref={placeholderEl} />
      {/* Links section */}
      <div className={[styles.postLink].join(' ')} ref={containerEl}>
        <div className={[styles.postLinkTopBar, styles.postSection].join(' ')} ref={topBarEl}>
          <p>
            Post links to
            {' '}
            <a
              href={postLinkUrl}
              target="_blank"
              rel="noreferrer noopener"
              className={styles.postLinkAnchor}
            >
              <LinkIcon fill={brandColors.bgColor} />
              {postLinkPlatform}
            </a>
          </p>
          <p>
            <a role="button" className={styles.postLinkEditButton} onClick={toggleLinkContent}>
              {linkPanelOpen ? 'Save' : 'Edit'}
            </a>
          </p>
        </div>
        {/* Link change content */}
        <div className={[styles.postLinkContent, styles.postSection].join(' ')} ref={mainContentEl}>
          <PostLinkOptions
            postId={postId}
            postIndex={postIndex}
            postLinkPlatform={postLinkPlatform}
            setPostLinkPlatform={setPostLinkPlatform}
            setAddUrl={setAddUrl}
            setError={setError}
          />

          {/* Show add URL dialogue if triggered */}
          {addUrl && (
            <PostLinkAddUrl
              setError={setError}
              postId={postId}
              postIndex={postIndex}
              postLinkPlatform={postLinkPlatform}
              setPostLinkPlatform={setPostLinkPlatform}
              setAddUrl={setAddUrl}
              updateLink={updateLink}
            />
          )}
        </div>

      </div>
    </>
  )
}

PostLink.propTypes = {
  postId: PropTypes.string.isRequired,
  postIndex: PropTypes.number.isRequired,
  priorityDsp: PropTypes.string,
  updateLink: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
}

PostLink.defaultProps = {
  priorityDsp: '',
}


export default PostLink
