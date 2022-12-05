import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'
import { useImmerReducer } from 'use-immer'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'
import usePostsStore from '@/app/stores/postsStore'
import Spinner from '@/elements/Spinner'
import Error from '@/elements/Error'
import PostsAll from '@/app/PostsAll'
import PostsNone from '@/app/PostsNone'
import { formatPostsResponse, getCursor, getPosts } from '@/app/helpers/postsHelpers'
import { track } from '@/helpers/trackingHelpers'
import produce from 'immer'

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

const shouldUpdatePosts = (newProps, oldProps) => {
  const { artistId: newArtistId, sortBy: newSortBy, filterBy: newFilterBy, isLoadingMore } = newProps
  const { artistId: oldArtistId, sortBy: oldSortBy, filterBy: oldFilterBy, isLoadingMore: isAlreadyLoadingMore } = oldProps

  if (isLoadingMore && !isAlreadyLoadingMore) {
    return true
  }

  if (newArtistId !== oldArtistId) {
    return true
  }

  if (newSortBy !== oldSortBy) {
    return true
  }

  if (newFilterBy !== oldFilterBy) {
    return true
  }

  return false
}

const PostsLoader = ({ sortBy, filterBy }) => {
  const [posts, setPosts] = useImmerReducer(postsReducer, postsInitialState)
  const [visiblePost, setVisiblePost] = React.useState(0)
  const [isLoadingMore, setIsLoadingMore] = React.useState(false)
  const [error, setError] = React.useState(null)

  const cursor = React.useRef('')
  const isInitialLoad = React.useRef(true)
  const isEndOfAssets = React.useRef(false)
  const limit = 10

  const { artist, artistId, artistLoading } = React.useContext(ArtistContext)
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)

  React.useEffect(() => {
    if (!artistId) return

    isInitialLoad.current = true
    cursor.current = null
    isEndOfAssets.current = false
  }, [artistId, sortBy, filterBy])

  useAsyncEffect(async (isMounted) => {
    if (!artistId || isEndOfAssets.current) {
      return
    }

    const { res: posts, error } = await getPosts({ limit, artistId, sortBy, filterBy, cursor: cursor.current })
    if (!isMounted) {
      return
    }

    if (error) {
      setError(error)
      toggleGlobalLoading(false)
      return
    }

    if (!posts || !posts.length) {
      isEndOfAssets.current = true
      setIsLoadingMore(false)

      if (isInitialLoad.current) {
        setPosts({ type: 'reset-posts' })
      }

      isInitialLoad.current = false
      return
    }

    const postsFormatted = formatPostsResponse(posts)
    const lastPost = posts[posts.length - 1]
    if (lastPost._links.after) {
      const nextCursor = getCursor(lastPost)
      cursor.current = nextCursor
    }

    if (isLoadingMore) {
      setIsLoadingMore(false)
      setPosts({
        type: 'add-posts',
        payload: {
          newPosts: postsFormatted,
        },
      })
      return
    }

    setPosts({
      type: 'replace-posts',
      payload: {
        newPosts: postsFormatted,
      },
    })
    isInitialLoad.current = false
  }, [shouldUpdatePosts])

  const toggleCampaign = React.useCallback(async (promotionEnabled, promotableStatus, campaignType = 'all', postId) => {
    const postIndex = posts.findIndex(({ id }) => postId === id)
    const newPromotionState = promotionEnabled

    setPosts({
      type: campaignType === 'all' ? 'toggle-promotion' : 'toggle-conversion',
      payload: {
        promotionEnabled,
        promotableStatus,
        postIndex,
      },
    })

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

  const loadMorePosts = React.useCallback(() => {
    setIsLoadingMore(true)
  }, [])

  const updatePost = React.useCallback((action, payload) => {
    setPosts({ type: action, payload })
  }, [setPosts])


  const setUpdatePostsWithMissingLinks = usePostsStore(React.useCallback((state) => state.setUpdatePostsWithMissingLinks, []))

  React.useEffect(() => {
    const updatePostsWithMissingLinks = (missingLinkIds = []) => {
      const updatedPosts = produce(posts, (draftPosts) => {
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

  if (artistLoading) {
    return null
  }

  if (!isLoadingMore && !posts.length) {
    return (
      <PostsNone
        filterBy={filterBy}
      />
    )
  }

  if (isInitialLoad.current) {
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
        loadMorePosts={loadMorePosts}
        isLoadingMore={isLoadingMore}
        hasLoadedAll={isEndOfAssets.current}
        isMissingDefaultLink={artist.missingDefaultLink}
      />
      {isLoadingMore && (
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
  sortBy: PropTypes.string.isRequired,
  filterBy: PropTypes.object.isRequired,
}

export default PostsLoader
