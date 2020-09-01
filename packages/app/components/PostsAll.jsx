// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'

import produce from 'immer'
// IMPORT CONTEXTS
import { InterfaceContext } from '@/contexts/InterfaceContext'
// IMPORT HOOKS
// IMPORT COMPONENTS
import PostItem from '@/app/PostItem'
// IMPORT ASSETS
// IMPORT STYLES
import styles from '@/app/PostsPage.module.css'

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
  postToggleSetter,
  loadMorePosts,
  loadingMore,
  loadedAll,
  promotionStatus,
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
  const postsWithLoadingTrigger = React.useMemo(() => {
    return getPostsWithLoadingTrigger(posts, loadAtIndex)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts.length, promotionStatus])
  // Create ref for intersection root
  const intersectionRoot = React.useRef(null)

  // LOAD MORE Watch the load trigger for intersection
  const loadMore = React.useCallback((entries) => {
    const target = entries[0]
    if (target.isIntersecting && !loadingMore && !loadedAll) {
      loadMorePosts()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingMore, loadMorePosts, loadedAll, promotionStatus])

  // Setup intersection observer
  const loadTrigger = React.useRef(null)
  const observer = React.useRef(null)
  React.useEffect(() => {
    // Handle no posts
    if (!posts.length) {
      if (loadTrigger.current && observer.current) {
        observer.current.unobserve(loadTrigger.current)
      }
      return
    }
    // Observer options
    const options = { rootMargin: '0px', threshold: 0 }
    // Create observer
    observer.current = new IntersectionObserver(loadMore, options)
    // observe the loader
    if (loadTrigger && loadTrigger.current) {
      observer.current.observe(loadTrigger.current)
    }

    // clean up
    const loadTriggerEl = loadTrigger.current
    const observerCache = observer.current
    return () => {
      if (loadTriggerEl) {
        observerCache.unobserve(loadTriggerEl)
      }
    }
  }, [posts.length, loadMore, loadedAll, promotionStatus])

  return (
    <section className={styles.postsSection}>
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
              enabled={post.promotionEnabled}
              updateLink={updateLink}
              singular={posts.length === 1}
              togglePromotion={togglePromotion}
              postToggleSetter={postToggleSetter}
              className="col-span-12 xs:col-span-6 lg:col-span-4"
            >
              {post.loadTrigger && !loadedAll && (
                <div ref={loadTrigger} />
              )}
            </PostItem>
          )
        })}
      </ul>


    </section>
  )
}

PostsAll.propTypes = {
  posts: PropTypes.array.isRequired,
  updateLink: PropTypes.func.isRequired,
  togglePromotion: PropTypes.func.isRequired,
  postToggleSetter: PropTypes.string,
  loadMorePosts: PropTypes.func.isRequired,
  loadingMore: PropTypes.bool,
  loadedAll: PropTypes.bool,
}

PostsAll.defaultProps = {
  postToggleSetter: '',
  loadingMore: false,
  loadedAll: false,
}


export default PostsAll
