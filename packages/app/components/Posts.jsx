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
  const { type: actionType, payload = {} } = postsAction
  const {
    index,
    status,
    newStatus,
    post,
    posts,
    linkSpecs,
    adMessages,
    callToActions,
  } = payload

  switch (actionType) {
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
    case 'toggle-conversion':
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

const Posts = ({ dummyPostsImages }) => {
  const [posts, setPosts] = useImmerReducer(postsReducer, postsInitialState)
  const { artistId } = React.useContext(ArtistContext)
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
    hasArtists ? (
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
            className="border-grey-2 bg-grey-1"
          />
          <PostsLoader
            status="inactive"
            posts={posts.inactive}
            setPosts={setPosts}
            className="border-grey-2 bg-grey-1"
          />
          <PostsLoader
            status="archived"
            posts={posts.archived}
            setPosts={setPosts}
            className="border-grey-2 bg-grey-1"
          />
        </div>
      ) : (
        <PostsInitialImport
          artistId={artistId}
          setCanLoadPosts={setCanLoadPosts}
        />
      )
    ) : (
      <PostsNoArtists dummyPostsImages={dummyPostsImages} />
    )
  )
}

export default Posts
