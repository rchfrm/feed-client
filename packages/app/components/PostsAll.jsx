import React from 'react'
import PropTypes from 'prop-types'
import produce from 'immer'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import PostCard from '@/app/PostCard'
import AdCreationButton from '@/app/AdCreationButton'
import styles from '@/app/PostsPage.module.css'

const getPostsWithLoadingTrigger = (posts, loadAtIndex) => {
  if (!posts.length || posts.length < loadAtIndex) {
    return posts
  }

  return produce(posts, (draftPosts) => {
    const insertLoaderAt = posts.length - loadAtIndex + 1
    draftPosts[insertLoaderAt].loadTrigger = true
  })
}

const PostsAll = ({
  posts,
  updatePost,
  toggleCampaign,
  loadMorePosts,
  isLoadingMore,
  hasLoadedAll,
  isMissingDefaultLink,
}) => {
  const { artistId } = React.useContext(ArtistContext)

  const intersectionRoot = React.useRef(null)
  const loadTrigger = React.useRef(null)
  const observer = React.useRef(null)

  const loadAtIndex = 5
  const lastPostId = React.useMemo(() => {
    if (!posts || !posts.length) {
      return ''
    }

    const lastPost = posts[posts.length - 1]
    return lastPost.id
  }, [posts])

  const postsWithLoadingTrigger = React.useMemo(() => {
    return getPostsWithLoadingTrigger(posts, loadAtIndex)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts])

  const loadMore = React.useCallback((entries) => {
    const target = entries[0]
    if (target.isIntersecting && !isLoadingMore && !hasLoadedAll) {
      loadMorePosts()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingMore, loadMorePosts, hasLoadedAll, lastPostId])

  React.useEffect(() => {
    if (!posts.length) {
      if (loadTrigger.current && observer.current) {
        observer.current.unobserve(loadTrigger.current)
      }
      return
    }

    observer.current = new IntersectionObserver(loadMore, {
      rootMargin: '0px', threshold: 0,
    })

    if (loadTrigger && loadTrigger.current) {
      observer.current.observe(loadTrigger.current)
    }

    const loadTriggerEl = loadTrigger.current
    const observerCache = observer.current

    return () => {
      if (loadTriggerEl) {
        observerCache.unobserve(loadTriggerEl)
      }
    }
  }, [posts.length, loadMore, hasLoadedAll, lastPostId])

  React.useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }
    const scroller = document.getElementById('PostsAll__scroller')

    if (!scroller) {
      return
    }
    scroller.scrollLeft = 0
  }, [])

  return (
    <section className={styles.postsSection}>
      <AdCreationButton className="hidden" />
      <ul
        id="PostsAll__scroller"
        className={[
          'sm:grid',
          'grid-cols-12',
          'gap-y-10',
          'gap-x-6',
          'grid-flow-row-dense',
          styles.postsScroller,
        ].join(' ')}
        ref={intersectionRoot}
      >
        {postsWithLoadingTrigger.map((post, index) => {
          return (
            <PostCard
              key={post.id}
              post={post}
              postIndex={index}
              updatePost={updatePost}
              toggleCampaign={toggleCampaign}
              isMissingDefaultLink={isMissingDefaultLink}
              artistId={artistId}
              className={[
                'mx-auto max-w-sm mb-12',
                'sm:max-w-none sm:mx-0 sm:mb-0',
                'col-span-12 sm:col-span-6 lg:col-span-4',
              ].join(' ')}
            >
              {post.loadTrigger && !hasLoadedAll && (
                <div ref={loadTrigger} />
              )}
            </PostCard>
          )
        })}
      </ul>
      {!isLoadingMore && hasLoadedAll && (
        <div className="col-span-12 w-full mt-10 p-5 text-center">
          <p className="h4">Loaded all Posts</p>
        </div>
      )}
    </section>
  )
}

PostsAll.propTypes = {
  posts: PropTypes.array.isRequired,
  updatePost: PropTypes.func.isRequired,
  toggleCampaign: PropTypes.func.isRequired,
  loadMorePosts: PropTypes.func.isRequired,
  isLoadingMore: PropTypes.bool,
  hasLoadedAll: PropTypes.bool,
  isMissingDefaultLink: PropTypes.bool.isRequired,
}

PostsAll.defaultProps = {
  isLoadingMore: false,
  hasLoadedAll: false,
}

export default PostsAll
