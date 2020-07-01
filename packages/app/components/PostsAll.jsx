// IMPORT PACKAGES
import React from 'react'
import produce from 'immer'
// IMPORT CONTEXTS
import { SidePanelContext } from '@/app/contexts/SidePanelContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'
// IMPORT HOOKS
// IMPORT ELEMENTS
import Spinner from '@/elements/Spinner'
import Button from '@/elements/Button'
import GearIcon from '@/icons/GearIcon'
// IMPORT COMPONENTS
import PostsSettings from '@/app/PostsSettings'
import PostItem from '@/app/PostItem'
import PostsNone from '@/app/PostsNone'
// IMPORT ASSETS
import MarkdownText from '@/elements/MarkdownText'
// IMPORT STYLES
import styles from '@/app/PostsPage.module.css'
import copy from '@/app/copy/PostsPageCopy'
import brandColors from '@/constants/brandColors'

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
  React.useEffect(() => {
    // Observer options
    const options = {
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
  }, [posts.length, loadMore])

  // Open the post settings side panel
  const { setSidePanelContent, toggleSidePanel } = React.useContext(SidePanelContext)
  const togglePostsSettings = React.useCallback(() => {
    setSidePanelContent(<PostsSettings togglePromotionGlobal={togglePromotionGlobal} />)
    toggleSidePanel(true)
  }, [setSidePanelContent, toggleSidePanel, togglePromotionGlobal])

  // Stop here if no posts
  if (posts.length === 0) {
    return <PostsNone />
  }

  return (
    <section className={styles.postsSection}>

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
        className={[
          'grid',
          'grid-cols-12',
          'row-gap-8',
          'col-gap-0',
          'xs:col-gap-6',
          'sm:col-gap-8',
          'grid-flow-row-dense',
          styles.postsScroller,
        ].join(' ')}
        ref={intersectionRoot}
      >
        {postsWithLoadingTrigger.map((post, index) => {
          return (
            <PostItem
              key={post.id}
              index={index}
              post={post}
              enabled={post.promotion_enabled}
              updateLink={updateLink}
              singular={posts.length === 1}
              togglePromotion={togglePromotion}
              className="col-span-12 xs:col-span-6 lg:col-span-4"
            >
              {post.loadTrigger && (
                <div
                  ref={loadTrigger}
                  className={[styles.postLoadTrigger].join(' ')}
                />
              )}
            </PostItem>
          )
        })}
        {/* Loading spinner */}
        {loadingMore && (
          <div className={[styles.postsSpinner, 'col-span-12 xs:col-span-6 lg:col-span-4'].join(' ')}>
            <Spinner />
          </div>
        )}
      </ul>


    </section>
  )
}

export default PostsAll
