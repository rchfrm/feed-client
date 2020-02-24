// IMPORT PACKAGES
import React from 'react'
import Router from 'next/router'
import useAsyncEffect from 'use-async-effect'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { AuthContext } from './contexts/Auth'
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import Button from './elements/Button'
import Spinner from './elements/Spinner'
import Error from './elements/Error'
// IMPORT PAGES
import PostsAll from './PostsAll'
import Budget from './PostsBudget'
// IMPORT ASSETS
// IMPORT CONSTANTS
import * as ROUTES from '../constants/routes'
// IMPORT HELPERS
import helper from './helpers/helper'
import server from './helpers/server'
import brandColours from '../constants/brandColours'
// IMPORT STYLES
import styles from './PostsPage.module.css'

// Define initial state and reducer for posts
const postsInitialState = []
const postsReducer = (postsState, postsAction) => {
  switch (postsAction.type) {
    case 'reset-posts':
      return postsInitialState
    case 'add-posts':
      return [
        ...postsState,
        ...postsAction.payload,
      ]
    case 'toggle-promotion':
      postsState[postsAction.payload.index].promotion_enabled = postsAction.payload.promotion_enabled
      return [
        ...postsState,
      ]
    case 'update-link':
      postsState[postsAction.payload.index].priority_dsp = postsAction.payload.link
      return [
        ...postsState,
      ]
    default:
      return [
        ...postsState,
      ]
  }
}

// ASYNC FUNCTION TO RETRIEVE UNPROMOTED POSTS
const getPosts = async ({ artist, offset, limit, getToken }) => {
  const token = await getToken()
  const posts = await server.getUnpromotedPosts(offset, limit, artist.id, token)
    .catch((err) => {
      throw (err)
    })

  // Sort the returned posts chronologically, latest first
  return helper.sortAssetsChronologically(Object.values(posts))
}
// END ASYNC FUNCTION TO RETRIEVE UNPROMOTED POSTS

function PostsLoader() {
// DEFINE STATES
  const [pageLoading, setPageLoading] = React.useState(true)
  const [posts, setPosts] = React.useReducer(postsReducer, postsInitialState)
  const [numberOfPosts, setNumberOfPosts] = React.useState(0)
  const [visiblePost, setVisiblePost] = React.useState(0)
  const [offset, setOffset] = React.useState(0)
  const [loadMore, setLoadMore] = React.useState(true)
  const [loadingMore, setLoadingMore] = React.useState(false)
  const [error, setError] = React.useState(null)
  // END DEFINE STATES

  // IMPORT CONTEXTS
  const { getToken } = React.useContext(AuthContext)
  const { artist, artistLoading } = React.useContext(ArtistContext)
  let assets = []
  if (artist._embedded && artist._embedded.assets) {
    assets = artist._embedded.assets
  }
  // END IMPORT CONTEXTS

  // // ASYNC FUNCTION TO RETRIEVE UNPROMOTED POSTS
  // const getPosts = React.useCallback(async (offset, limit) => {
  //   const token = await getToken()
  //   const posts = await server.getUnpromotedPosts(offset, limit, artist.id, token)
  //     .catch((err) => {
  //       throw (err)
  //     })

  //   // Sort the returned posts chronologically, latest first
  //   return helper.sortAssetsChronologically(Object.values(posts))
  // }, [artist.id, getToken])
  // // END ASYNC FUNCTION TO RETRIEVE UNPROMOTED POSTS

  // RESET PAGE STATE IF SELECTED ARTIST CHANGES
  React.useEffect(() => {
    setPageLoading(true)
    setPosts({ type: 'reset-posts' })
    setNumberOfPosts(0)
    setVisiblePost(0)
    setOffset(0)
    setLoadMore(true)
    setLoadingMore(false)
  }, [artist.id])
  // END RESET PAGE STATE IF SELECTED ARTIST CHANGES

  // GET POSTS FROM SERVER, IF AVAILABLE
  useAsyncEffect(async (isMounted) => {
    // Return if there is no selected artist
    if (!artist.id) return
    // Return if load isn't required
    if (!loadMore) return
    // Return if a request to get more posts has already been made
    if (loadingMore) return
    // Return if there are no more assets to get
    if (assets.length < offset) return

    // Set loading to true
    setLoadingMore(true)

    // Make request to get unpromoted posts
    const posts = await getPosts({ artist, offset, limit: 10, getToken })
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
      payload: posts,
    })
    setLoadMore(false)
    setLoadingMore(false)
    setOffset(offset + 10)
    if (pageLoading) {
      setPageLoading(false)
    }
  }, [artist.id, assets, loadMore, offset, pageLoading])
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
  const togglePromotion = async e => {
    e.preventDefault()
    const id = e.target.dataset.item
    let indexOfId
    for (let i = 0; i < posts.length; i += 1) {
      if (posts[i].id === id) {
        indexOfId = i
        break
      }
    }
    const token = await getToken()
    const res = await server.togglePromotionEnabled(artist.id, id, !posts[indexOfId].promotion_enabled, token)
    if (res) {
      setPosts({
        type: 'toggle-promotion',
        payload: {
          id,
          index: indexOfId,
          promotion_enabled: res.promotion_enabled,
        },
      })
    }
  }
  // END TOGGLE PROMOTION ENABLED

  // GO HOME
  const returnHome = e => {
    Router.push(ROUTES.HOME)
    e.preventDefault()
  }
  // END GO HOME

  // RETURN
  if (artistLoading || pageLoading) {
    return <Spinner width={50} colour={brandColours.green.hex} />
  }
  return (
    <div className={styles['posts-page']}>

      <PostsAll
        posts={posts}
        numberOfPosts={numberOfPosts}
        visiblePost={visiblePost}
        setVisiblePost={setVisiblePost}
        setPosts={setPosts}
        togglePromotion={togglePromotion}
      />

      <Error error={error} />

      <Budget
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
          version="black progress"
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
