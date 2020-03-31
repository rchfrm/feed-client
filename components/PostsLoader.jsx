// IMPORT PACKAGES
import React from 'react'
import Router from 'next/router'
import useAsyncEffect from 'use-async-effect'
import isEmpty from 'lodash/isEmpty'
import produce from 'immer'
import usePrevious from 'use-previous'
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
import brandColors from '../constants/brandColors'
// IMPORT STYLES
import styles from './PostsPage.module.css'

// Define initial state and reducer for posts
const postsInitialState = []
const postsReducer = (postsState, postsAction) => {
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
    case 'reset-posts':
      return postsInitialState
    case 'add-posts':
      return produce(postsState, draft => {
        draft.push(...newPosts)
      })
    case 'replace-posts':
      return newPosts
    case 'toggle-promotion':
      return produce(postsState, draft => {
        draft[postIndex].promotion_enabled = promotionEnabled
      })
    case 'update-link':
      return produce(postsState, draft => {
        draft[postIndex].priority_dsp = postLink
      })
    default:
      return postsState
  }
}

// ASYNC FUNCTION TO RETRIEVE UNPROMOTED POSTS
const getPosts = async ({ artist, offset, limit }) => {
  const posts = await server.getUnpromotedPosts(offset, limit, artist.id)

  // Sort the returned posts chronologically, latest first
  return helper.sortAssetsChronologically(Object.values(posts))
}


function PostsLoader() {
  // DEFINE STATES
  const [pageLoading, setPageLoading] = React.useState(true)
  const [posts, setPosts] = React.useReducer(postsReducer, postsInitialState)
  const [numberOfPosts, setNumberOfPosts] = React.useState(0)
  const [visiblePost, setVisiblePost] = React.useState(0)
  const [offset, setOffset] = React.useState(0)
  const [loadMore, setLoadMore] = React.useState(false)
  const [loadingMore, setLoadingMore] = React.useState(false)
  const [error, setError] = React.useState(null)
  const postsPerPage = 10
  // END DEFINE STATES

  // IMPORT CONTEXTS
  const { artist, artistLoading } = React.useContext(ArtistContext)
  let assets = []
  if (artist._embedded && artist._embedded.assets) {
    assets = artist._embedded.assets
  }

  // RESET POSTS STATE IF SELECTED ARTIST CHANGES
  const previousArtistState = usePrevious(artist)
  useAsyncEffect(async (isMounted) => {
    if (!artist || isEmpty(artist)) return
    // Stop here if artist ID is the same
    if (previousArtistState) {
      const { id: artistId } = artist
      const { id: previousArtistID } = previousArtistState
      if (artistId === previousArtistID) {
        return
      }
    }
    // Return if there is no selected artist
    if (!artist.id) return
    // Start loading
    setPageLoading(true)
    // Reset offset
    setOffset(0)
    // GEt posts
    // Make request to get unpromoted posts
    const posts = await getPosts({ artist, offset: 0, limit: 10 })
      .catch((err) => {
        if (!isMounted()) return
        setPageLoading(false)
        setError(err)
      })
    if (!isMounted()) return
    // Replace posts with new artist posts
    setPosts({
      type: 'replace-posts',
      payload: {
        newPosts: posts,
      },
    })
    // Update offset
    setOffset(posts.length)
    // Stop page loading
    setPageLoading(false)
  }, [artist])

  // GET EXTRA POSTS FROM SERVER, IF AVAILABLE
  useAsyncEffect(async (isMounted) => {
    // Return if load isn't required
    if (!loadMore) return
    // Return if a request to get more posts has already been made
    if (loadingMore) return
    // Return if there are no more assets to get
    if (assets.length < offset) return
    // Stop here if page is loading
    if (pageLoading) return
    // Set loading to true
    setLoadingMore(true)
    // Make request to get unpromoted posts
    const posts = await getPosts({ artist, offset, limit: 10 })
      .catch((err) => {
        if (!isMounted()) return
        setLoadMore(false)
        setLoadingMore(false)
        setError(err)
      })
    if (!isMounted()) return
    // Add returned posts to state, and update offset
    setPosts({
      type: 'add-posts',
      payload: {
        newPosts: posts,
      },
    })
    setLoadMore(false)
    setLoadingMore(false)
    setOffset(offset + postsPerPage)
    setPageLoading(false)
  }, [assets, loadMore, offset])
  // END GET POSTS FROM SERVER, IF AVAILABLE

  // IF POSTS CHANGES, UPDATE NUMBER OF POSTS
  React.useEffect(() => {
    if (posts.length !== numberOfPosts) {
      setNumberOfPosts(posts.length)
    }
  }, [numberOfPosts, posts])
  // END IF POSTS CHANGES, UPDATE NUMBER OF POSTS

  // IF USER PASSES 50% MARK IN SCROLL, TRIGGER LOADING OF MORE POSTS
  React.useEffect(() => {
    const halfWayPost = Math.floor(numberOfPosts / 2)
    if (visiblePost > halfWayPost && !loadingMore) {
      setLoadMore(true)
    }
  }, [loadingMore, numberOfPosts, visiblePost])
  // END IF USER PASSES 50% MARK IN SCROLL, TRIGGER LOADING OF MORE POSTS

  // TOGGLE PROMOTION ENABLED
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

  // GO HOME
  const returnHome = e => {
    Router.push(ROUTES.HOME)
    e.preventDefault()
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

  // RETURN
  if (artistLoading || pageLoading) {
    return <Spinner width={50} color={brandColors.green} />
  }
  return (
    <div className={styles['posts-page']}>

      <PostsAll
        posts={posts}
        numberOfPosts={numberOfPosts}
        visiblePost={visiblePost}
        setVisiblePost={setVisiblePost}
        updateLink={updateLink}
        togglePromotion={togglePromotion}
      />

      <Error error={error} />

      <PostsBudget
        currency="£"
      />

      <div
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
      </div>

    </div>
  )

// END RETURN
}

export default PostsLoader
