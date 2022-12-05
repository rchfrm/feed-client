import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import PostsList from '@/app/PostsList'

import Spinner from '@/elements/Spinner'
import Error from '@/elements/Error'
import { formatPostsResponse, getPosts } from '@/app/helpers/postsHelpers'

const PostsLoader = ({
  title,
  status,
  limit,
  posts,
  setPosts,
}) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const cursor = React.useRef('')
  const { artistId } = React.useContext(ArtistContext)

  useAsyncEffect(async (isMounted) => {
    if (!artistId) {
      return
    }

    setIsLoading(true)

    const { res: posts, error } = await getPosts({ limit, artistId, filterBy: { promotion_status: status }, cursor: cursor.current })
    if (!isMounted) {
      return
    }

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    const postsFormatted = formatPostsResponse(posts)

    setPosts({
      type: 'set-posts',
      payload: {
        status: status[0],
        posts: postsFormatted,
      },
    })

    setPosts(postsFormatted)
    setIsLoading(false)
  }, [artistId])

  return (
    <div className="mb-10 rounded-dialogue bg-grey-1">
      <div className="px-5 rounded-dialogue rounded-b-none py-3 bg-grey-2">
        <h2 className="mb-0">{title}</h2>
      </div>
      <div className="p-5">
        {isLoading ? (
          <Spinner width={25} />
        ) : (
          <PostsList posts={posts} />
        )}
      </div>
      <Error error={error} />
    </div>
  )
}

PostsLoader.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.array.isRequired,
  limit: PropTypes.number.isRequired,
  posts: PropTypes.array.isRequired,
  setPosts: PropTypes.func.isRequired,
}

export default PostsLoader
