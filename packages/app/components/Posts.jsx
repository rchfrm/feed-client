import React from 'react'
import moment from 'moment'
import { useImmerReducer } from 'use-immer'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'
import PostsNoArtists from '@/app/PostsNoArtists'
import PostsInitialImport from '@/app/PostsInitialImport'
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
    linkSpecs,
    adMessages,
    callToActions,
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
    case 'update-link-specs':
      draftState[status][index].linkSpecs = linkSpecs
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

const Posts = () => {
  const [posts, setPosts] = useImmerReducer(postsReducer, postsInitialState)
  const { artist, artistId } = React.useContext(ArtistContext)
  const { hasSetUpProfile } = artist
  const { user } = React.useContext(UserContext)


  const [canLoadPosts, setCanLoadPosts] = React.useState(false)
  const hasArtists = user.artists.length > 0

  const testIsNewUser = (user) => {
    const now = moment()
    const { created_at } = user
    const minuteDiff = now.diff(moment(created_at), 'minutes')

    return minuteDiff <= 30
  }

  const isNewUser = React.useMemo(() => {
    return testIsNewUser(user)
  }, [user])

  React.useEffect(() => {
    if (! isNewUser) {
      setCanLoadPosts(true)
    }
  }, [isNewUser])

  return (
    hasArtists && hasSetUpProfile ? (
      canLoadPosts ? (
        <div className="relative">
          <PostsLoader
            status="active"
            posts={posts.active}
            setPosts={setPosts}
            className="border-2 border-green"
          />
          <PostsLoader
            status="rejected"
            posts={posts.rejected}
            setPosts={setPosts}
            className="border-2 border-red"
          />
          <PostsLoader
            status="pending"
            posts={posts.pending}
            setPosts={setPosts}
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
        <PostsInitialImport
          artistId={artistId}
          setCanLoadPosts={setCanLoadPosts}
        />
      )
    ) : (
      <PostsNoArtists />
    )
  )
}

export default Posts
