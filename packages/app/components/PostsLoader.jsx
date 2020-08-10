// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'

import { useAsync } from 'react-async'
import { useImmerReducer } from 'use-immer'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { ArtistContext } from '@/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'
// IMPORT ELEMENTS
import Spinner from '@/elements/Spinner'
import Error from '@/elements/Error'
// IMPORT PAGES
import PostsAll from '@/app/PostsAll'
import PostsNone from '@/app/PostsNone'
// IMPORT HELPERS
import * as utils from '@/helpers/utils'
import * as server from '@/app/helpers/appServer'
import * as postsHelpers from '@/app/helpers/postsHelpers'
import { track } from '@/app/helpers/trackingHelpers'

// Define initial state and reducer for posts
const postsInitialState = []
const postsReducer = (draftState, postsAction) => {
  const { type: actionType, payload = {} } = postsAction
  const {
    newPosts,
    postIndex,
    promotion_enabled,
    postLink,
  } = payload
  switch (actionType) {
    case 'replace-posts':
      return newPosts
    case 'reset-posts':
      return postsInitialState
    case 'add-posts':
      draftState.push(...newPosts)
      break
    case 'toggle-promotion':
      draftState[postIndex].promotion_enabled = promotion_enabled
      break
    case 'toggle-promotion-global':
      draftState.forEach((post) => {
        post.promotion_enabled = promotion_enabled
      })
      break
    case 'update-link':
      draftState[postIndex].priority_dsp = postLink
      break
    default:
      return draftState
  }
}


// ASYNC FUNCTION TO RETRIEVE UNPROMOTED POSTS
const fetchPosts = async ({ artistId, limit, isEndOfAssets, cursor }) => {
  if (!artistId) return
  // Stop here if at end of posts
  if (isEndOfAssets.current) return
  // Get posts
  const promotionStatus = 'inactive'
  const posts = await server.getPosts({ limit, artistId, promotionStatus, cursor: cursor.current })
  // Format posts
  const postsFormatted = postsHelpers.formatPostsResponse(posts)
  // Sort the returned posts chronologically, latest first
  return utils.sortAssetsChronologically(Object.values(postsFormatted))
}

// THE COMPONENT
// ------------------
function PostsLoader({ setTogglePromotionGlobal }) {
  // DEFINE STATES
  const [posts, setPosts] = useImmerReducer(postsReducer, postsInitialState)
  const [visiblePost, setVisiblePost] = React.useState(0)
  const cursor = React.useRef('')
  const initialLoad = React.useRef(true)
  const [loadingMore, setLoadingMore] = React.useState(false)
  const [error, setError] = React.useState(null)
  const isEndOfAssets = React.useRef(false)
  const postsPerPage = 10

  // Import artist context
  const { artistId, artistLoading } = React.useContext(ArtistContext)
  // Import interface context
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)

  // When changing artist...
  React.useEffect(() => {
    if (!artistId) return
    // Reset initial load
    initialLoad.current = true
    // Remove after cursor
    cursor.current = null
    // Update end of assets state
    isEndOfAssets.current = false
  }, [artistId])

  // Run this to fetch posts when the artist changes
  const { isPending } = useAsync({
    promiseFn: fetchPosts,
    watchFn: (newProps, oldProps) => {
      const { artistId: newArtistId, loadingMore } = newProps
      const { artistId: oldArtistId, loadingMore: alreadyLoadingMore } = oldProps
      if (loadingMore && !alreadyLoadingMore) return true
      if (newArtistId !== oldArtistId) return true
      return false
    },
    // The variable(s) to pass to promiseFn
    artistId,
    limit: postsPerPage,
    isEndOfAssets,
    loadingMore,
    cursor,
    // When fetch finishes
    onResolve: (posts) => {
      console.log('posts', posts)
      // Turn off global loading
      toggleGlobalLoading(false)
      // Handle result...
      if (!posts || !posts.length) {
        isEndOfAssets.current = true
        setLoadingMore(false)
        // Handle no posts on initial load
        if (initialLoad.current) {
          setPosts({ type: 'reset-posts' })
        }
        // Define initial load
        initialLoad.current = false
        return
      }
      // Update afterCursor
      const lastPost = posts[posts.length - 1]
      if (lastPost._links.after) {
        const nextCursor = postsHelpers.getCursor(lastPost)
        cursor.current = nextCursor
      }
      // If loading extra posts
      if (loadingMore) {
        // Stop loading
        setLoadingMore(false)
        // Update posts
        setPosts({
          type: 'add-posts',
          payload: {
            newPosts: posts,
          },
        })
        return
      }
      // If replacing artist posts
      setPosts({
        type: 'replace-posts',
        payload: {
          newPosts: posts,
        },
      })
      // Define initial load
      initialLoad.current = false
    },
    // Handle errors
    onReject(error) {
      setError(error)
    },
  })

  // Define function for toggling promotion
  const togglePromotion = React.useCallback(async (postId, promotion_enabled) => {
    const indexOfId = posts.findIndex(({ id }) => postId === id)
    const newPromotionState = promotion_enabled
    setPosts({
      type: 'toggle-promotion',
      payload: {
        promotion_enabled,
        postIndex: indexOfId,
      },
    })
    // Track
    const status = newPromotionState ? 'enabled' : 'disabled'
    track({
      category: 'Posts',
      action: `Promotion ${status} for post`,
      description: `Post ID: ${postId}`,
      label: `artistId: ${artistId}`,
    })
    return newPromotionState
  }, [posts, artistId, setPosts])

  // Define function to batch toggle all posts
  // and set it on the parent
  React.useEffect(() => {
    const togglePromotionGlobal = (promotion_enabled) => {
      setPosts({
        type: 'toggle-promotion-global',
        payload: {
          promotion_enabled,
        },
      })
    }
    setTogglePromotionGlobal(() => (promotion_enabled) => {
      togglePromotionGlobal(promotion_enabled)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTogglePromotionGlobal])

  // Define function for loading more posts
  const loadMorePosts = React.useCallback(() => {
    setLoadingMore(true)
  }, [])

  // Define function to refresh posts
  const refreshPosts = React.useCallback(() => {
    toggleGlobalLoading(true)
    setLoadingMore(true)
  }, [toggleGlobalLoading])

  // Define function to update links
  const updateLink = React.useCallback((postIndex, postLink) => {
    setPosts({
      type: 'update-link',
      payload: {
        postIndex,
        postLink,
      },
    })
    track({
      category: 'Posts',
      action: 'Post link changed',
      description: `New link: ${postLink}`,
      label: `artistId: ${artistId}`,
    })
  }, [setPosts, artistId])

  // Wait if initial loading
  if (artistLoading || (isPending && initialLoad.current)) {
    return null
  }

  // No posts if none
  if (!posts || !posts.length) {
    return <PostsNone refreshPosts={refreshPosts} />
  }

  return (
    <div>

      <PostsAll
        posts={posts}
        visiblePost={visiblePost}
        setVisiblePost={setVisiblePost}
        updateLink={updateLink}
        togglePromotion={togglePromotion}
        loadMorePosts={loadMorePosts}
        loadingMore={loadingMore}
        loadedAll={isEndOfAssets.current}
      />

      {/* Loading spinner */}
      {loadingMore && (
        <div className={['pt-20 py-10'].join(' ')}>
          <div className="mx-auto w-20">
            <Spinner />
          </div>
        </div>
      )}

      <Error error={error} />

    </div>
  )
}

PostsLoader.propTypes = {
  setTogglePromotionGlobal: PropTypes.func.isRequired,
}

export default PostsLoader
