// IMPORT PACKAGES
import React from 'react'
import { useAsync } from 'react-async'
import { useImmerReducer } from 'use-immer'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import Spinner from './elements/Spinner'
import Error from './elements/Error'
// IMPORT PAGES
import PostsAll from './PostsAll'
import PostsBudget from './PostsBudget'
// IMPORT HELPERS
import helper from './helpers/helper'
import server from './helpers/server'
import { track } from './helpers/trackingHelpers'
// IMPORT STYLES
import styles from './PostsPage.module.css'

// Define initial state and reducer for posts
const postsInitialState = null
const postsReducer = (draftState, postsAction) => {
  const {
    type: actionType,
    payload: {
      newPosts,
      postIndex,
      promotion_enabled,
      postLink,
    },
  } = postsAction
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
const fetchPosts = async ({ artistId, offset, limit, isEndOfAssets, cursor }) => {
  if (!artistId) return
  // Stop here if at end of posts
  if (isEndOfAssets.current) return
  // Get posts
  let posts
  if (cursor.current) {
    posts = await server.getUnpromotedPostsAfter(cursor.current.href)
  } else {
    posts = await server.getUnpromotedPosts(offset.current, limit, artistId)
  }
  // Sort the returned posts chronologically, latest first
  return helper.sortAssetsChronologically(Object.values(posts))
}

// THE COMPONENT
// ------------------
function PostsLoader() {
  // DEFINE STATES
  const [posts, setPosts] = useImmerReducer(postsReducer, postsInitialState)
  const [visiblePost, setVisiblePost] = React.useState(0)
  const offset = React.useRef(0)
  const cursor = React.useRef(null)
  const [initialLoad, setInitialLoad] = React.useState(true)
  const [loadingMore, setLoadingMore] = React.useState(false)
  const [error, setError] = React.useState(null)
  const isEndOfAssets = React.useRef(false)
  const postsPerPage = 10

  // Import artist context
  const { artist, artistId, artistLoading } = React.useContext(ArtistContext)

  // When changing artist...
  React.useEffect(() => {
    if (!artistId) return
    // Reset initial load
    setInitialLoad(true)
    // Remove after cursor
    cursor.current = null
    // Reset offset
    offset.current = 0
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
    offset,
    limit: postsPerPage,
    isEndOfAssets,
    loadingMore,
    cursor,
    // When fetch finishes
    onResolve: (posts) => {
      if (!posts) return
      if (!posts.length) {
        isEndOfAssets.current = true
        setLoadingMore(false)
        setInitialLoad(false)
        return
      }
      // Update offset
      offset.current += posts.length
      // Update afterCursor
      const lastPost = posts[posts.length - 1]
      if (lastPost._links.after) {
        cursor.current = posts[posts.length - 1]._links.after
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
      setInitialLoad(false)
    },
    // Handle errors
    onReject(error) {
      setError(error)
    },
  })

  // Define function for toggling promotion
  const togglePromotion = React.useCallback(async (postId) => {
    const indexOfId = posts.findIndex(({ id }) => postId === id)
    const currentPromotionState = posts[indexOfId].promotion_enabled
    const newPromotionState = !currentPromotionState
    const res = await server.togglePromotionEnabled(artistId, postId, newPromotionState)
    if (!res) return currentPromotionState
    setPosts({
      type: 'toggle-promotion',
      payload: {
        promotion_enabled: res.promotion_enabled,
        postIndex: indexOfId,
      },
    })
    // Track
    const status = newPromotionState ? 'enabled' : 'disabled'
    track({
      category: 'Posts',
      action: `Promotion ${status} for post`,
      description: `Post ID: ${postId}`,
      label: artistId,
    })
    return newPromotionState
  }, [posts])
  // Define function to batch toggle all posts
  const togglePromotionGlobal = React.useCallback((promotion_enabled) => {
    setPosts({
      type: 'toggle-promotion-global',
      payload: {
        promotion_enabled,
      },
    })
  }, [posts])

  // Define function for loading more posts
  const loadMorePosts = () => {
    setLoadingMore(true)
  }

  // Define function to update links
  const updateLink = (postIndex, postLink) => {
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
      label: artistId,
    })
  }

  // RETURN
  if (artistLoading || (isPending && initialLoad) || !posts) {
    return <Spinner />
  }
  return (
    <div className={styles['posts-page']}>

      <PostsAll
        posts={posts}
        visiblePost={visiblePost}
        setVisiblePost={setVisiblePost}
        updateLink={updateLink}
        togglePromotion={togglePromotion}
        togglePromotionGlobal={togglePromotionGlobal}
        loadMorePosts={loadMorePosts}
        loadingMore={loadingMore}
      />

      <Error error={error} />

      <PostsBudget currency={artist.currency} />

    </div>
  )
}

export default PostsLoader
