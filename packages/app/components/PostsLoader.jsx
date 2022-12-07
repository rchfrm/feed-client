import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import PostsList from '@/app/PostsList'
import PostsLoadMore from '@/app/PostsLoadMore'
import Spinner from '@/elements/Spinner'
import Error from '@/elements/Error'
import ExpandIcon from '@/icons/ExpandIcon'
import CollapseIcon from '@/icons/CollapseIcon'
import { formatPostsResponse, getPosts, getCursor } from '@/app/helpers/postsHelpers'

const PostsLoader = ({
  title,
  status,
  limit,
  posts,
  setPosts,
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(true)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isLoadingMore, setIsLoadingMore] = React.useState(false)
  const [error, setError] = React.useState(null)

  const cursor = React.useRef('')
  const isInitialLoad = React.useRef(true)
  const hasLoadedAll = React.useRef(false)

  const { artistId } = React.useContext(ArtistContext)

  useAsyncEffect(async (isMounted) => {
    if (!artistId || (!isInitialLoad.current && !isLoadingMore)) {
      return
    }

    if (!isLoadingMore) {
      setIsLoading(true)
    }

    const { res: posts, error } = await getPosts({ limit, artistId, filterBy: { promotion_status: [status] }, cursor: cursor.current })
    if (!isMounted) {
      return
    }

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    if (!posts || !posts.length) {
      hasLoadedAll.current = true
      isInitialLoad.current = false
      setIsLoading(false)
      setIsLoadingMore(false)

      return
    }

    const postsFormatted = formatPostsResponse(posts)
    const lastPost = posts[posts.length - 1]
    if (lastPost._links.after) {
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

    isInitialLoad.current = false
    setPosts(postsFormatted)
    setIsLoading(false)
  }, [artistId, isLoadingMore])

  const handleClick = () => {
    setIsOpen((isOpen) => !isOpen)
  }

  return (
    <div className={[
      'mb-5 rounded-dialogue',
      isOpen ? 'max-h-[1200px]' : 'max-h-[74px] overflow-hidden',
      'transition-all duration-700 ease-in-out',
      className,
    ].join(' ')}
    >
      <button
        onClick={handleClick}
        className={[
          'w-full flex justify-between items-center p-5',
          isOpen ? 'rounded-b-none' : null,
        ].join(' ')}
      >
        <h2 className="mb-0 mr-5">{status === 'active' ? posts.length : null} {title}</h2>
        {isOpen ? <CollapseIcon /> : <ExpandIcon />}
      </button>
      <div className={[
        'p-5',
        'transition ease-in-out delay-200 transition-opacity',
        isOpen ? 'opacity-1' : 'opacity-0',
      ].join(' ')}
      >
        {isLoading ? (
          <Spinner width={25} />
        ) : (
          <PostsList
            posts={posts}
            status={status}
            className="mb-5"
          />
        )}
        <PostsLoadMore
          posts={posts}
          isLoading={isLoading}
          isLoadingMore={isLoadingMore}
          setIsLoadingMore={setIsLoadingMore}
          hasLoadedAll={hasLoadedAll.current}
        />
      </div>
      <Error error={error} />
    </div>
  )
}

PostsLoader.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired,
  posts: PropTypes.array.isRequired,
  setPosts: PropTypes.func.isRequired,
}

export default PostsLoader
