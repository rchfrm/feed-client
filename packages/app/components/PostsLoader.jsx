// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'

import { useAsync } from 'react-async'
import { useImmerReducer } from 'use-immer'
// IMPORT CONTEXTS
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'
// IMPORT HOOKS
import usePostsStore from '@/app/stores/postsStore'
// IMPORT ELEMENTS
import Spinner from '@/elements/Spinner'
import Error from '@/elements/Error'
// IMPORT COMPONENTS
import PostsAll from '@/app/PostsAll'
import PostsNone from '@/app/PostsNone'
// IMPORT HELPERS
import * as server from '@/app/helpers/appServer'
import * as postsHelpers from '@/app/helpers/postsHelpers'
import { track } from '@/app/helpers/trackingHelpers'
import produce from 'immer'

// Define initial state and reducer for posts
const postsInitialState = []
const postsReducer = (draftState, postsAction) => {
  const { type: actionType, payload = {} } = postsAction
  const {
    newPosts,
    postIndex,
    promotionEnabled,
    promotableStatus,
    linkSpecs,
    adMessages,
    callToActions,
    priorityEnabled,
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
      draftState[postIndex].promotionEnabled = promotionEnabled
      draftState[postIndex].promotableStatus = promotableStatus
      break
    case 'toggle-conversion':
      draftState[postIndex].conversionsEnabled = promotionEnabled
      draftState[postIndex].promotableStatus = promotableStatus
      break
    case 'toggle-promotion-global':
      draftState.forEach((post) => {
        post.promotionEnabled = promotionEnabled
      })
      break
    case 'update-link-specs':
      draftState[postIndex].linkSpecs = linkSpecs
      break
    case 'update-call-to-actions':
      draftState[postIndex].callToActions = callToActions
      break
    case 'update-captions':
      draftState[postIndex].adMessages = adMessages
      break
    case 'toggle-priority':
      draftState[postIndex].priorityEnabled = priorityEnabled
      break
    default:
      return draftState
  }
}

// ASYNC FUNCTION TO RETRIEVE UNPROMOTED POSTS
const fetchPosts = async ({ promotionStatus, sortBy, artistId, limit, isEndOfAssets, cursor }) => {
  if (!artistId) return
  // Stop here if at end of posts
  if (isEndOfAssets.current) return
  // Get posts
  const posts = await server.getPosts({ limit, artistId, promotionStatus, sortBy, cursor: cursor.current })
  return posts
}

// WHEN TO UPDATE POSTS
const updateDataConditions = (newProps, oldProps) => {
  const { artistId: newArtistId, promotionStatus: newpromotionStatus, sortBy: newSortBy, loadingMore } = newProps
  const { artistId: oldArtistId, promotionStatus: oldPromotionStatus, sortBy: oldSortBy, loadingMore: alreadyLoadingMore } = oldProps
  if (loadingMore && !alreadyLoadingMore) return true
  if (newArtistId !== oldArtistId) return true
  if (newpromotionStatus !== oldPromotionStatus) return true
  if (newSortBy !== oldSortBy) return true
  return false
}

// THE COMPONENT
// ------------------
function PostsLoader({ setRefreshPosts, promotionStatus, sortBy }) {
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
  const { artist, artistId, artistLoading } = React.useContext(ArtistContext)
  // Import interface context
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)

  // When changing artist or promotion status...
  React.useEffect(() => {
    if (!artistId) return
    // Reset initial load
    initialLoad.current = true
    // Remove after cursor
    cursor.current = null
    // Update end of assets state
    isEndOfAssets.current = false
  }, [artistId, promotionStatus, sortBy])

  // Run this to fetch posts when the artist changes
  const { isPending } = useAsync({
    promiseFn: fetchPosts,
    watchFn: updateDataConditions,
    // The variable(s) to pass to promiseFn
    artistId,
    limit: postsPerPage,
    isEndOfAssets,
    loadingMore,
    cursor,
    promotionStatus,
    sortBy,
    // When fetch finishes
    onResolve: (posts) => {
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
      // Format posts
      const postsFormatted = postsHelpers.formatPostsResponse(posts)
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
            newPosts: postsFormatted,
          },
        })
        return
      }
      // If replacing artist posts
      setPosts({
        type: 'replace-posts',
        payload: {
          newPosts: postsFormatted,
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

  // Define what toggled the post enabled status
  // (single or batch)
  const [postToggleSetterType, setPostToggleSetterType] = React.useState('single')

  // Define function for toggling SINGLE promotion campaign or conversions campaign
  const toggleCampaign = React.useCallback(async (postId, promotionEnabled, promotableStatus, campaignType = 'all') => {
    const postIndex = posts.findIndex(({ id }) => postId === id)
    const newPromotionState = promotionEnabled
    setPostToggleSetterType('single')
    setPosts({
      type: campaignType === 'all' ? 'toggle-promotion' : 'toggle-conversion',
      payload: {
        promotionEnabled,
        promotableStatus,
        postIndex,
      },
    })
    // Track
    const { postType, platform, organicMetrics = {}, paidMetrics = {} } = posts[postIndex]
    track('post_promotion_status', {
      status: newPromotionState ? 'eligible' : 'ineligible',
      postType,
      platform,
      campaignType,
      es: paidMetrics.engagementScore ?? organicMetrics.engagementScore,
    })
    return newPromotionState
  }, [posts, setPosts])

  // Define function to BATCH TOGGLE all posts
  // and save it in posts store
  const setTogglePromotionGlobal = usePostsStore(React.useCallback(state => state.setTogglePromotionGlobal, []))
  React.useEffect(() => {
    const togglePromotionGlobal = (promotionEnabled) => {
      setPostToggleSetterType('batch')
      setPosts({
        type: 'toggle-promotion-global',
        payload: {
          promotionEnabled,
        },
      })
      // TRACK
      track('default_post_promotion_status', {
        status: promotionEnabled ? 'opt-in' : 'opt-out',
      })
    }
    setTogglePromotionGlobal((promotionEnabled) => {
      togglePromotionGlobal(promotionEnabled)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTogglePromotionGlobal])

  // Define function for loading more posts
  const loadMorePosts = React.useCallback(() => {
    setLoadingMore(true)
  }, [])

  // REFRESH POSTS
  // Define function to refresh posts
  const refreshPosts = React.useCallback(() => {
    setLoadingMore(true)
    // Remove after cursor
    cursor.current = null
    // Update end of assets state
    isEndOfAssets.current = false
    setPosts({ type: 'reset-posts' })
  }, [setPosts])
  // Export refresh posts function to parent
  React.useEffect(() => {
    setRefreshPosts(() => () => refreshPosts())
  }, [setRefreshPosts, refreshPosts])

  // Define function to update post
  const updatePost = React.useCallback((action, payload) => {
    setPosts({ type: action, payload })
  }, [setPosts])

  // Define function to update posts with missing links
  // and export to posts store
  const setUpdatePostsWithMissingLinks = usePostsStore(React.useCallback(state => state.setUpdatePostsWithMissingLinks, []))
  React.useEffect(() => {
    const updatePostsWithMissingLinks = (missingLinkIds = []) => {
      const updatedPosts = produce(posts, draftPosts => {
        draftPosts.forEach((post) => {
          Object.values(post.linkSpecs).forEach((linkSpec, index) => {
            const { linkId } = linkSpec
            if (linkId && missingLinkIds.includes(linkId) && post.linkType !== 'adcreative') {
              delete post.linkSpecs[index]
            }
          })
        })
      })
      setPosts({
        type: 'replace-posts',
        payload: { newPosts: updatedPosts },
      })
    }
    setUpdatePostsWithMissingLinks((missingLinkIds) => {
      updatePostsWithMissingLinks(missingLinkIds)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts, setUpdatePostsWithMissingLinks])

  // Wait if initial loading
  if (artistLoading) return null

  // Show no posts message if no posts
  if (!isPending && !loadingMore && !posts.length) {
    return (
      <PostsNone
        refreshPosts={refreshPosts}
        promotionStatus={promotionStatus}
        sortBy={sortBy}
        artist={artist}
      />
    )
  }

  if (isPending && initialLoad.current) {
    return (
      <div className="pt-10 pb-10">
        <Spinner />
      </div>
    )
  }

  return (
    <div>

      <PostsAll
        posts={posts}
        visiblePost={visiblePost}
        setVisiblePost={setVisiblePost}
        updatePost={updatePost}
        toggleCampaign={toggleCampaign}
        postToggleSetterType={postToggleSetterType}
        loadMorePosts={loadMorePosts}
        loadingMore={loadingMore}
        loadedAll={isEndOfAssets.current}
        isMissingDefaultLink={artist.missingDefaultLink}
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
  setRefreshPosts: PropTypes.func.isRequired,
  promotionStatus: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
}

export default PostsLoader
