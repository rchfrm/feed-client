// IMPORT PACKAGES
import React from 'react'
import Router from 'next/router'
import useAsyncEffect from 'use-async-effect'
import isEmpty from 'lodash/isEmpty'
import { useImmerReducer } from 'use-immer'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import Feed from './elements/Feed'
import Button from './elements/Button'
import Spinner from './elements/Spinner'
// IMPORT PAGES
import { PromotePostsButton } from './page/InsightsPage'
import ResultsAll from './ResultsAll'
// IMPORT ASSETS
// IMPORT CONSTANTS
import brandColors from '../constants/brandColors'
import * as ROUTES from '../constants/routes'
// IMPORT HELPERS
import helper from './helpers/helper'
import server from './helpers/server'
// IMPORT STYLES

const initialPostsState = {
  active: {},
  archive: {},
}
const postsReducer = (draftState, postsAction) => {
  const {
    type: actionType,
    payload: {
      type: postType,
      assets: newPosts,
      id: postId,
      promotion_enabled,
    },
  } = postsAction
  switch (actionType) {
    case 'replace-assets':
      draftState[postType] = newPosts
      break
    case 'no-assets':
      draftState[postType] = {}
      break
    case 'set-promotion-enabled':
      draftState[postType][postId].promotion_enabled = promotion_enabled
      break
    default:
      throw new Error(`Could not find ${postsAction.type} in postsReducer`)
  }
}

function NoResults({ dailyBudget }) {
  const handleClick = e => {
    e.preventDefault()
    Router.push(ROUTES.POSTS)
  }

  if (dailyBudget > 0) {
    return (
      <div
        className="fill-height ninety-wide"
        style={{ justifyContent: 'initial' }}
      >
        <h3>
          <Feed />
          {' '}
          is setting up your posts for promotion.
        </h3>
        <p>
          There may be a delay whilst posts await approval, once promotions have started you'll be able to see your results here.
        </p>
      </div>
    )
  }

  return (
    <div
      className="fill-height"
      style={{ justifyContent: 'initial' }}
    >
      <h3 className="ninety-wide" style={{ flex: 'auto' }}>
        <Feed />
        {' '}
        hasn't started promoting your posts yet, get started by entering a daily budget&nbsp;
        <Button version="text" onClick={handleClick}>here</Button>
        .
      </h3>
      <PromotePostsButton dailyBudget={dailyBudget} />
    </div>
  )
}

const getAssets = async (status, artistId, token) => {
  const promotionStatus = status === 'archive' ? 'archived' : status
  // return result
  const assets = await server.getAssets(artistId, promotionStatus, token)
  return assets
}


function ResultsLoader() {
  // IMPORT CONTEXTS
  const { artist, artistLoading } = React.useContext(ArtistContext)
  // END IMPORT CONTEXTS
  // DEFINE STATES
  const [posts, setPosts] = useImmerReducer(postsReducer, initialPostsState)
  const [loading, setLoading] = React.useState(false)
  // PREVIOUS STATE
  const previousArtistState = React.useRef(artist)
  const [, setError] = React.useState(null)
  // TODO : Display errors somewhere


  const setPostsState = (assets, type) => {
    if (assets && assets.length) {
      setPosts({
        type: 'replace-assets',
        payload: {
          type,
          assets: helper.arrToObjById(assets),
        },
      })
    }
  }

  const getPostOfType = async (type, isMounted) => {
    // Start getting assets
    const assets = await getAssets(type, artist.id)
      .catch((err) => {
        if (!isMounted()) return
        setPosts({
          type: 'no-assets',
          payload: {
            type,
          },
        })
        setError(err)
      })
    return assets
  }

  const getAllPosts = async (isMounted) => {
    // Stop here if no artist
    // Get assets for active and archive
    return Promise.all([
      getPostOfType('active', isMounted),
      getPostOfType('archive', isMounted),
    ])
  }

  // GET ACTIVE POSTS FROM SERVER when artists changes
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
    setLoading(true)
    // Get active assets
    const [activePosts, archivePosts] = await getAllPosts(isMounted)
      .catch((err) => {
        throw (err)
      })
    if (!isMounted()) return
    // Set assets
    setPostsState(activePosts, 'active')
    setPostsState(archivePosts, 'archive')
    // Save previous artist state
    previousArtistState.current = artist
    // Set loading to false
    setLoading(false)
  }, [artist])


  // RETURN
  if (artistLoading || loading) {
  // If artist is loading, or both active and archived posts are loading, show spinner
    return <Spinner width={50} color={brandColors.green} />
  } if (
    Object.keys(posts.active).length === 0
    && Object.keys(posts.archive).length === 0
  ) {
  // If the active and archived endpoints have been called,
    // but there are no posts, show NoResults
    return <NoResults dailyBudget={artist.daily_budget} />
  }
  // Otherwise, show Results components
  return (
    <div style={{ width: '100%' }}>
      {/* Active posts */}
      <ResultsAll active posts={posts.active} setPosts={setPosts} />
      {/* Archived posts */}
      <ResultsAll active={false} posts={posts.archive} setPosts={setPosts} />
    </div>
  )

// END RETURN
}

export default ResultsLoader
