// IMPORT PACKAGES
import React from 'react'
import Router from 'next/router'
import { useAsync } from 'react-async'
import { useImmerReducer } from 'use-immer'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import Button from './elements/Button'
import Spinner from './elements/Spinner'
import Error from './elements/Error'
// IMPORT PAGES
import PostsAll from './PostsAll'
import PostsBudget from './PostsBudget'
// IMPORT ASSETS
// IMPORT CONSTANTS
import * as ROUTES from '../constants/routes'
// IMPORT HELPERS
import helper from './helpers/helper'
import server from './helpers/server'
// IMPORT STYLES
import styles from './PostsPage.module.css'

// Define initial state and reducer for posts
const postsInitialState = []
const postsReducer = (draftState, postsAction) => {
  const {
    type: actionType,
    payload: {
      newPosts,
      postIndex,
      promotionEnabled,
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
      draftState[postIndex].promotion_enabled = promotionEnabled
      break
    case 'update-link':
      draftState[postIndex].priority_dsp = postLink
      break
    default:
      return draftState
  }
}

// ASYNC FUNCTION TO RETRIEVE UNPROMOTED POSTS
const fetchPosts = async ({ artistId, offset, limit }) => {
  const posts = await server.getUnpromotedPosts(offset, limit, artistId)
  // Sort the returned posts chronologically, latest first
  return helper.sortAssetsChronologically(Object.values(posts))
}

function PostsLoader() {
  // DEFINE STATES
  const [posts, setPosts] = useImmerReducer(postsReducer, postsInitialState)
  const [visiblePost, setVisiblePost] = React.useState(0)
  const [offset, setOffset] = React.useState(0)
  // const [loadMore, setLoadMore] = React.useState(false)
  const [initialLoad, setInitialLoad] = React.useState(true)
  const [loadingMore, setLoadingMore] = React.useState(false)
  const [error, setError] = React.useState(null)
  const postsPerPage = 10
  // END DEFINE STATES

  // Import artist context
  const { artist, artistId, artistLoading } = React.useContext(ArtistContext)

  // For counting how many posts an artist has
  const [totalPosts, setTotalPosts] = React.useState(0)

  // When changing artist...
  React.useEffect(() => {
    if (!artistId) return
    // Reset initial load
    setInitialLoad(true)
    // Reset offset
    setOffset(0)
    // Update total artist posts
    if (artist._embedded && artist._embedded.assets) {
      const allPosts = artist._embedded.assets
      setTotalPosts(allPosts.length)
      console.log('total posts', allPosts.length)
    }
  }, [artistId])

  // Run this to fetch posts when the artist changes
  const { isPending } = useAsync({
    promiseFn: fetchPosts,
    // watch: artistId,
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
    loadingMore,
    // When fetch finishes
    onResolve: (posts) => {
      if (!posts) return
      // Define initial load
      setInitialLoad(false)
      // Update offset
      setOffset(offset + posts.length)
      // If loading extra posts
      if (loadingMore) {
        setLoadingMore(false)
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
    },
    // Handle errors
    onReject(error) {
      setError(error)
    },
  })

  // Define function for toggling promotion
  const togglePromotion = async (postId) => {
    let indexOfId
    for (let i = 0; i < posts.length; i += 1) {
      if (posts[i].id === postId) {
        indexOfId = i
        break
      }
    }
    const res = await server.togglePromotionEnabled(artist.id, postId, !posts[indexOfId].promotion_enabled)
    if (res) {
      setPosts({
        type: 'toggle-promotion',
        payload: {
          promotion_enabled: res.promotion_enabled,
          postIndex: indexOfId,
          promotionEnabled: res.promotion_enabled,
        },
      })
    }
  }

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
  }

  // // GO HOME
  // const returnHome = e => {
  //   Router.push(ROUTES.HOME)
  //   e.preventDefault()
  // }

  // RETURN
  if (artistLoading || (isPending && initialLoad)) {
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
        loadMorePosts={loadMorePosts}
        loadingMore={loadingMore}
      />

      <Error error={error} />

      <PostsBudget
        currency="£"
      />

      {/* <div
        className="ninety-wide"
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          version="black  wide"
          onClick={returnHome}
        >
          Done
        </Button>
      </div> */}

    </div>
  )

// END RETURN
}

export default PostsLoader
