import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'
import usePrevious from 'use-previous'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import PostsContainer from '@/app/PostsContainer'
import Error from '@/elements/Error'
import { postsConfig, getPosts } from '@/app/helpers/postsHelpers'

const PostsLoader = ({
  status,
  initialSortBy,
  posts,
  setPosts,
  isSpendingPaused,
  className,
}) => {
  const [sortBy, setSortBy] = React.useState(initialSortBy)
  const [filterBy, setFilterBy] = React.useState({})
  const [isLoading, setIsLoading] = React.useState(false)
  const [isLoadingMore, setIsLoadingMore] = React.useState(false)
  const [hasLoadedAll, setHasLoadedAll] = React.useState(false)
  const [error, setError] = React.useState(null)

  const isInitialRender = React.useRef(true)
  const limit = 5
  const cursor = React.useRef('')

  const { artistId } = React.useContext(ArtistContext)
  const previousIsLoadingMore = usePrevious(isLoadingMore)

  useAsyncEffect(async (isMounted) => {
    if (! artistId || isLoading || (! isLoadingMore && previousIsLoadingMore)) {
      return
    }

    if (! isLoadingMore) {
      setIsLoading(true)
    }

    setHasLoadedAll(false)

    const { res: posts, formattedPosts, error } = await getPosts({
      limit,
      artistId,
      filterBy: {
        ...postsConfig[status].filterBy,
        ...filterBy,
      },
      sortBy,
      ...(isLoadingMore && { cursor: cursor.current }),
    })
    if (! isMounted) {
      return
    }

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    if (isLoadingMore && ! posts.length) {
      setHasLoadedAll(true)
    }

    const lastPost = posts[posts.length - 1]
    cursor.current = lastPost?.id

    if (isLoadingMore) {
      setPosts({
        type: 'add-posts',
        payload: {
          status,
          posts: formattedPosts,
        },
      })
      setIsLoadingMore(false)

      return
    }

    setPosts({
      type: 'set-posts',
      payload: {
        status,
        posts: formattedPosts,
      },
    })

    setIsLoading(false)
  }, [artistId, filterBy, sortBy, isLoadingMore])

  React.useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    if (posts.length === 0 && status !== 'pending' && ! hasLoadedAll) {
      setIsLoadingMore(true)
    }
  }, [posts.length, status, hasLoadedAll])

  React.useEffect(() => {
    if (! artistId) {
      return
    }

    cursor.current = null
    setHasLoadedAll(false)
    setFilterBy({})
  }, [artistId])

  if (status === 'rejected' && ! posts.length && ! Object.keys(filterBy).length) {
    return
  }

  return (
    <>
      <Error error={error} />
      <PostsContainer
        status={status}
        posts={posts}
        setPosts={setPosts}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        sortBy={sortBy}
        setSortBy={setSortBy}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        setIsLoadingMore={setIsLoadingMore}
        hasLoadedAll={hasLoadedAll}
        isSpendingPaused={isSpendingPaused}
        className={className}
      />
    </>
  )
}

PostsLoader.propTypes = {
  status: PropTypes.string.isRequired,
  initialSortBy: PropTypes.string,
  posts: PropTypes.array.isRequired,
  setPosts: PropTypes.func.isRequired,
  isSpendingPaused: PropTypes.bool,
  className: PropTypes.string,
}

PostsLoader.defaultProps = {
  initialSortBy: 'published_time',
  isSpendingPaused: false,
  className: null,
}

export default PostsLoader
