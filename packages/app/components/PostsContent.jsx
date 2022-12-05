import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import PostsLoader from '@/app/PostsLoader'
import PostsNoArtists from '@/app/PostsNoArtists'
import PostsInitialImport from '@/app/PostsInitialImport'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'

const PostsContent = ({ dummyPostsImages }) => {
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
            sortBy=""
            filterBy=""
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

PostsContent.propTypes = {
  dummyPostsImages: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
}

export default PostsContent
