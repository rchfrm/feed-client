import React from 'react'
import { useImmerReducer } from 'use-immer'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'
import useControlsStore from '@/app/stores/controlsStore'
import PostsNoArtists from '@/app/PostsNoArtists'
import PostsLoader from '@/app/PostsLoader'

const postsInitialState = {
  active: [],
  pending: [],
  inactive: [],
  archived: [],
  rejected: [],
}

const postsReducer = (draftState, postsAction) => {
  const { type, payload = {} } = postsAction

  const {
    posts,
    post,
    postId,
    status,
    newStatus,
    links,
    callToActions,
    adMessages,
  } = payload

  const index = draftState[status].findIndex((draftPost) => draftPost.id === postId)

  switch (type) {
    case 'set-posts':
      draftState[status] = posts
      break
    case 'add-posts':
      draftState[status].push(...posts)
      break
    case 'toggle-promotion':
      draftState[status].splice(index, 1)
      draftState[newStatus].push(post)
      break
    case 'toggle-priority':
      draftState[status].splice(index, 1)
      draftState[newStatus].unshift(post)
      break
    case 'update-links':
      draftState[status][index].links = links
      break
    case 'update-call-to-actions':
      draftState[status][index].callToActions = callToActions
      break
    case 'update-ad-messages':
      draftState[status][index].adMessages = adMessages
      break
    case 'reset-posts':
      return postsInitialState
    default:
      return draftState
  }
}

const getControlsStoreState = (state) => ({
  isSpendingPaused: state.isSpendingPaused,
})

const Posts = () => {
  const [posts, setPosts] = useImmerReducer(postsReducer, postsInitialState)
  const { artist } = React.useContext(ArtistContext)
  const { hasSetUpProfile } = artist
  const { user } = React.useContext(UserContext)

  const hasArtists = user.artists.length > 0
  const { isSpendingPaused } = useControlsStore(getControlsStoreState)

  return (
    hasArtists && hasSetUpProfile ? (
      <div className="relative">
        <PostsLoader
          status="active"
          posts={posts.active}
          setPosts={setPosts}
          isSpendingPaused={isSpendingPaused}
          className={isSpendingPaused ? 'bg-yellow-bg-light border-yellow-border' : 'border-2 border-green'}
        />
        <PostsLoader
          status="rejected"
          posts={posts.rejected}
          setPosts={setPosts}
          className="border-2 border-red"
        />
        <PostsLoader
          status="pending"
          initialSortBy="normalized_score"
          posts={posts.pending}
          setPosts={setPosts}
          isSpendingPaused={isSpendingPaused}
          className="border-grey-light bg-offwhite"
        />
        <PostsLoader
          status="inactive"
          posts={posts.inactive}
          setPosts={setPosts}
          className="border-grey-light bg-offwhite"
        />
        <PostsLoader
          status="archived"
          posts={posts.archived}
          setPosts={setPosts}
          className="border-grey-light bg-offwhite"
        />
      </div>
    ) : (
      <PostsNoArtists />
    )
  )
}

export default Posts
