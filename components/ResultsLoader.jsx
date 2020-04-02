// IMPORT PACKAGES
import React from 'react'
import { useAsync } from 'react-async'
import { useImmerReducer } from 'use-immer'
// IMPORT CONTEXTS
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import Spinner from './elements/Spinner'
import Error from './elements/Error'
// IMPORT COMPONENTS
import ResultsNoResults from './ResultsNoResults'
import ResultsAll from './ResultsAll'
// IMPORT HELPERS
import helper from './helpers/helper'
import server from './helpers/server'

const initialPostsState = {
  active: {},
  archived: {},
}

const postsReducer = (draftState, postsAction) => {
  const {
    type: actionType,
    payload: {
      type: postType,
      newPosts,
      id: postId,
      promotion_enabled,
    },
  } = postsAction
  switch (actionType) {
    case 'replace-assets':
      newPosts.forEach(({ type, posts }) => {
        draftState[type] = posts
      })
      break
    case 'set-promotion-enabled':
      draftState[postType][postId].promotion_enabled = promotion_enabled
      break
    default:
      throw new Error(`Could not find ${postsAction.type} in postsReducer`)
  }
}

// RUN THIS TO FETCH THE POSTS
// ---------------------------
const fetchAllPosts = async ({ artistId }) => {
  if (!artistId) return
  const postTypes = ['active', 'archived']
  const getPostsPromise = postTypes.map(async (postType) => {
    return server.getAssets(artistId, postType)
  })
  const [activePosts, archivedPosts] = await Promise.all(getPostsPromise)
  return { activePosts, archivedPosts }
}


// THE COMPONENT
// ------------------
function ResultsLoader() {
  // Artist context
  const { artist, artistId, artistLoading } = React.useContext(ArtistContext)
  // DEFINE STATES
  const [posts, setPosts] = useImmerReducer(postsReducer, initialPostsState)

  // Run this to fetch posts when the artist changes
  const { error, isPending } = useAsync({
    promiseFn: fetchAllPosts,
    watch: artistId,
    // The variable(s) to pass to promiseFn
    artistId,
    // When promise resolves
    onResolve: ({ activePosts, archivedPosts }) => {
      const activePostsObj = activePosts.length ? helper.arrToObjById(activePosts) : {}
      const archivedPostsObj = archivedPosts.length ? helper.arrToObjById(archivedPosts) : {}
      setPosts({
        type: 'replace-assets',
        payload: {
          newPosts: [
            {
              type: 'active',
              posts: activePostsObj,
            },
            {
              type: 'archived',
              posts: archivedPostsObj,
            },
          ],
        },
      })
    },
  })

  // Define function for toggling posts
  const togglePost = ({ type, id, promotion_enabled }) => {
    setPosts({
      type: 'set-promotion-enabled',
      payload: { type, id, promotion_enabled },
    })
  }

  // If artist or results are loading
  if (artistLoading || isPending) return <Spinner />

  // Handle error
  if (error) return <Error error={error} messagePrefix="Error: " />

  // If the active and archived endpoints have been called,
  // but there are no posts, show NoResults
  if (!Object.keys(posts.active).length && !Object.keys(posts.archived).length) {
    return <ResultsNoResults dailyBudget={artist.daily_budget} />
  }

  console.log('posts', posts)

  // Otherwise, show Results components
  return (
    <div>
      {Object.entries(posts).map(([postType, posts]) => {
        const isActive = !!(postType === 'active')
        return (
          <ResultsAll
            key={postType}
            active={isActive}
            posts={posts}
            togglePost={togglePost}
          />
        )
      })}
    </div>
  )
}

export default ResultsLoader
