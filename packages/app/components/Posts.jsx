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
  inReview: [],
  inactive: [],
  archived: [],
  rejected: [],
}

const postsReducer = (draftState, postsAction) => {
  const { type: actionType, payload = {} } = postsAction
  const {
    section,
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
      draftState[section] = posts
      break
    case 'add-posts':
      draftState[section].push(...posts)
      break
    case 'toggle-promotion':
      draftState[postIndex].promotionEnabled = promotionEnabled
      break
    case 'toggle-conversion':
      draftState[postIndex].conversionsEnabled = promotionEnabled
      draftState[postIndex].promotableStatus = promotableStatus
      break
    case 'update-link-specs':
      draftState[section][postIndex].linkSpecs = linkSpecs
      break
    case 'update-call-to-actions':
      draftState[section][postIndex].callToActions = callToActions
      break
    case 'update-captions':
      draftState[section][postIndex].adMessages = adMessages
      break
    case 'toggle-priority':
      draftState[postIndex].priorityEnabled = priorityEnabled
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
    if (!isNewUser) {
      setCanLoadPosts(true)
    }
  }, [isNewUser])

  return (
    hasArtists ? (
      canLoadPosts ? (
        <div className="relative">
          <PostsLoader
            section="active"
            posts={posts.active}
            setPosts={setPosts}
            action={() => {}}
            className="border-2 border-solid border-green"
          />
          <PostsLoader
            section="rejected"
            posts={posts.rejected}
            setPosts={setPosts}
            action={() => {}}
            className="border border-solid border-red"
          />
          <PostsLoader
            section="inReview"
            posts={posts.inReview}
            setPosts={setPosts}
            action={() => {}}
            className="border border-solid border-grey-2 bg-grey-1"
          />
          <PostsLoader
            section="inactive"
            posts={posts.inactive}
            setPosts={setPosts}
            action={() => {}}
            className="border border-solid border-grey-2 bg-grey-1"
          />
          <PostsLoader
            section="archived"
            posts={posts.archived}
            setPosts={setPosts}
            action={() => {}}
            className="border border-solid border-grey-2 bg-grey-1"
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
