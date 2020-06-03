// IMPORT PACKAGES
import React from 'react'
import produce from 'immer'
// IMPORT CONTEXTS
import { SidePanelContext } from './contexts/SidePanelContext'
import { InterfaceContext } from './contexts/InterfaceContext'
// IMPORT HOOKS
import useOnResize from './hooks/useOnResize'
// IMPORT ELEMENTS
import Spinner from './elements/Spinner'
import Button from './elements/Button'
import GearIcon from './icons/GearIcon'
// IMPORT COMPONENTS
import PostsSettings from './PostsSettings'
import PostsSingle from './PostsSingle'
import PostsNone from './PostsNone'
// IMPORT ASSETS
import MarkdownText from './elements/MarkdownText'
import copy from '../copy/PostsPageCopy'
// IMPORT STYLES
import styles from './PostsPage.module.css'
import brandColors from '../constants/brandColors'

// Reset posts scroll position
const resetScroll = () => {
  if (typeof document === 'undefined') return
  const scroller = document.getElementById('PostsAll__scroller')
  if (!scroller) return
  scroller.scrollLeft = 0
}

const getPostsWithLoadingTrigger = (posts, loadAtIndex) => {
  if (!posts.length || posts.length < loadAtIndex) return posts
  return produce(posts, draftPosts => {
    const insertLoaderAt = posts.length - loadAtIndex + 1
    draftPosts[insertLoaderAt].loadTrigger = true
  })
}

// Render list of posts and track the one that's currently visible
function PostsAll({
  posts,
  updateLink,
  togglePromotion,
  togglePromotionGlobal,
  loadMorePosts,
  loadingMore,
}) {
  // Set header
  const { setHeader } = React.useContext(InterfaceContext)
  React.useEffect(() => {
    setHeader({ text: 'your posts' })
  }, [setHeader])
  // Reset the scroll position when this component first mounts
  React.useEffect(resetScroll, [])
  // Add load trigger el at 5th from end
  const loadAtIndex = 5
  const postsWithLoadingTrigger = getPostsWithLoadingTrigger(posts, loadAtIndex)
  // Create ref for intersection root
  const intersectionRoot = React.useRef(null)
  // Create ref for watching intersection
  const loadTrigger = React.useRef(null)

  // LOAD MORE Watch the load trigger for intersection
  const loadMore = React.useCallback((entries) => {
    const target = entries[0]
    if (target.isIntersecting && !loadingMore) {
      loadMorePosts()
    }
  }, [loadingMore, loadMorePosts])

  // Setup intersection observer
  const { width: windowWidth } = useOnResize({ throttle: 300 })
  React.useEffect(() => {
    const root = windowWidth > 992 ? null : intersectionRoot.current
    // Observer options
    const options = {
      root,
      rootMargin: '0px',
      threshold: 0,
    }
    // Create observer
    const observer = new IntersectionObserver(loadMore, options)
    // observe the loader
    if (loadTrigger && loadTrigger.current) {
      observer.observe(loadTrigger.current)
    }

    // clean up
    const loadTriggerEl = loadTrigger.current
    return () => {
      if (loadTriggerEl) {
        observer.unobserve(loadTriggerEl)
      }
    }
  }, [posts.length, windowWidth, loadMore])

  // Open the post settings side panel
  const { setSidePanelContent, toggleSidePanel } = React.useContext(SidePanelContext)
  const togglePostsSettings = () => {
    setSidePanelContent(<PostsSettings togglePromotionGlobal={togglePromotionGlobal} />)
    toggleSidePanel(true)
  }

  // Stop here if no posts
  if (posts.length === 0) {
    return <PostsNone />
  }

  return (
    <div className={styles['posts-section']}>

      <MarkdownText className={['h4--text', styles.introText].join(' ')} markdown={copy.intro} />

      {/* POST SETTINGS BUTTON */}
      <div>
        <Button
          className={styles.postSettingsButton}
          onClick={togglePostsSettings}
          version="black small icon"
        >
          <GearIcon fill={brandColors.bgColor} />
          Post Settings
        </Button>
      </div>

      <ul
        id="PostsAll__scroller"
        className={['frame', styles.posts, 'md:grid grid-cols-12 gap-8 grid-flow-row-dense'].join(' ')}
        ref={intersectionRoot}
      >
        {postsWithLoadingTrigger.map((post, index) => {
          return (
            <PostsSingle
              key={post.id}
              index={index}
              post={post}
              updateLink={updateLink}
              singular={posts.length === 1}
              togglePromotion={togglePromotion}
              className="col-span-6 lg:col-span-4"
            >
              {post.loadTrigger && (
                <div
                  ref={loadTrigger}
                  className={[styles.postLoadTrigger].join(' ')}
                />
              )}
            </PostsSingle>
          )
        })}
        {/* Loading spinner */}
        {loadingMore && (
          <div className={styles.postsSpinner}>
            <Spinner />
          </div>
        )}
      </ul>


    </div>
  )
}

export default PostsAll
