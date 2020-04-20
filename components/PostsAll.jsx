// IMPORT PACKAGES
import React from 'react'
import produce from 'immer'
// IMPORT CONTEXTS
import { SidePanelContext } from './contexts/SidePanelContext'
// IMPORT ELEMENTS
import PageHeader from './PageHeader'
import Spinner from './elements/Spinner'
// IMPORT COMPONENTS
import PostsSettings from './PostsSettings'
import PostsSingle from './PostsSingle'
import PostsNone from './PostsNone'
// IMPORT ASSETS
import MarkdownText from './elements/MarkdownText'
import copy from '../copy/PostsPageCopy'
// IMPORT STYLES
import styles from './PostsPage.module.css'
import Button from './elements/Button'

// Reset posts scroll position
const resetScroll = () => {
  if (typeof document === 'undefined') return
  const scroller = document.getElementById('PostsAll__scroller')
  if (!scroller) return
  scroller.scrollLeft = 0
}

const getPostsWithLoadingTrigger = (posts, loadAtIndex) => {
  if (!posts.length || posts.length < loadAtIndex) return posts
  return produce(posts, draft => {
    const insertLoaderAt = posts.length - loadAtIndex + 1
    draft.splice(insertLoaderAt, 0, 'loader')
  })
}

// Render list of posts and track the one that's currently visible
function PostsAll({
  posts,
  updateLink,
  togglePromotion,
  loadMorePosts,
  loadingMore,
}) {
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
      root: intersectionRoot.current, // window by default
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
    return () => {
      if (loadTrigger.current) {
        observer.unobserve(loadTrigger.current)
      }
    }
  }, [posts.length])

  // Open the post settings side panel
  const { setSidePanelContent, toggleSidePanel } = React.useContext(SidePanelContext)
  const togglePostsSettings = () => {
    setSidePanelContent(<PostsSettings />)
    toggleSidePanel(true)
  }

  // Stop here if no posts
  if (posts.length === 0) {
    return <PostsNone />
  }

  return (
    <div className={styles['posts-section']}>

      <PageHeader heading="review posts and set a budget" />

      <MarkdownText className="ninety-wide  h4--text" markdown={copy.intro} />

      {/* POST SETTINGS BUTTON */}
      <div className="ninety-wide">
        <Button className={styles.postSettingsButton} onClick={togglePostsSettings}>
          Post Settings
        </Button>
      </div>

      <ul
        id="PostsAll__scroller"
        className={`frame posts ${styles.posts}`}
        ref={intersectionRoot}
      >
        {postsWithLoadingTrigger.map((post, index) => {
          if (post === 'loader') {
            return (
              <div key="loader" ref={loadTrigger} className={styles.postLoadTrigger} />
            )
          }
          return (
            <PostsSingle
              key={post.id}
              index={index}
              post={post}
              updateLink={updateLink}
              singular={posts.length === 1}
              togglePromotion={togglePromotion}
            />
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
