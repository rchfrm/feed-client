import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useImmerReducer } from 'use-immer'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'
import PostsInitialImport from '@/app/PostsInitialImport'
import PostsNoArtists from '@/app/PostsNoArtists'
import PostsLoader from '@/app/PostsLoader'

const postsInitialState = {
  active: [],
  in_review: [],
  inactive: [],
}

const postsReducer = (draftState, postsAction) => {
  const { type: actionType, payload = {} } = postsAction
  const {
    status,
    posts,
    postIndex,
    promotionEnabled,
    promotableStatus,
    linkSpecs,
    adMessages,
    callToActions,
    priorityEnabled,
  } = payload

  switch (actionType) {
    case 'set-posts':
      draftState[status] = posts
      break
    case 'reset-posts':
      return postsInitialState
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
    if (!isNewUser) {
      setCanLoadPosts(true)
    }
  }, [isNewUser])

  return (
    hasArtists ? (
      canLoadPosts ? (
        <div className="relative">
          <PostsLoader
            title="Active"
            status={['active']}
            limit={5}
            posts={posts.active}
            setPosts={setPosts}
          />
          <PostsLoader
            title="Queue"
            status={['in_review']}
            limit={5}
            posts={posts.in_review}
            setPosts={setPosts}
          />
          <PostsLoader
            title="Library"
            status={['inactive', 'archived', 'rejected']}
            limit={10}
            posts={posts.inactive}
            setPosts={setPosts}
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

Posts.propTypes = {
  dummyPostsImages: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
}

export default Posts
