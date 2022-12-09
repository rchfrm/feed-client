import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import PostsContainer from '@/app/PostsContainer'
import Error from '@/elements/Error'
import { postsConfig, formatPostsResponse, getPosts, getCursor } from '@/app/helpers/postsHelpers'

const PostsLoader = ({
  status,
  posts,
  setPosts,
  className,
}) => {
  const [sortBy, setSortBy] = React.useState('')
  const [filterBy, setFilterBy] = React.useState({})
  const [isLoading, setIsLoading] = React.useState(false)
  const [isLoadingMore, setIsLoadingMore] = React.useState(false)
  const [error, setError] = React.useState(null)

  const limit = 5
  const cursor = React.useRef('')
  const hasLoadedAll = React.useRef(false)

  const { artistId } = React.useContext(ArtistContext)

  React.useEffect(() => {
    if (!artistId) {
      return
    }

    cursor.current = null
    hasLoadedAll.current = false
  }, [artistId])

  useAsyncEffect(async (isMounted) => {
    if (!artistId) {
      return
    }

    if (!isLoadingMore) {
      setIsLoading(true)
    }

    const { res: posts, error } = await getPosts({
      limit,
      artistId,
      filterBy: {
        ...postsConfig[status].filterBy,
        ...filterBy,
      },
      ...(isLoadingMore && { cursor: cursor.current }),
    })
    if (!isMounted) {
      return
    }

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    const postsFormatted = formatPostsResponse(posts)
    const lastPost = posts[posts.length - 1]
    if (lastPost?._links.after) {
      const nextCursor = getCursor(lastPost)
      cursor.current = nextCursor
    }

    if (isLoadingMore) {
      setPosts({
        type: 'add-posts',
        payload: {
          status,
          posts: postsFormatted,
        },
      })
      setIsLoadingMore(false)

      return
    }

    setPosts({
      type: 'set-posts',
      payload: {
        status,
        posts: postsFormatted,
      },
    })

    setPosts(postsFormatted)
    setIsLoading(false)
  }, [artistId, isLoadingMore, sortBy, filterBy])

  return (
    <>
      <PostsContainer
        status={status}
        posts={posts}
        setPosts={setPosts}
        filterBy={filterBy}
        setSortBy={setSortBy}
        setFilterBy={setFilterBy}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        setIsLoadingMore={setIsLoadingMore}
        hasLoadedAll={hasLoadedAll.current}
        className={className}
      />
      <Error error={error} />
    </>
  )
}

PostsLoader.propTypes = {
  status: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  setPosts: PropTypes.func.isRequired,
  className: PropTypes.string,
}

PostsLoader.defaultProps = {
  className: null,
}

export default PostsLoader
