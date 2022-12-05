import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import PostsList from '@/app/PostsList'
import Spinner from '@/elements/Spinner'
import Error from '@/elements/Error'
import ArrowIcon from '@/icons/ArrowIcon'
import { formatPostsResponse, getPosts } from '@/app/helpers/postsHelpers'

const PostsLoader = ({
  title,
  status,
  limit,
  posts,
  setPosts,
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
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

  const handleClick = () => {
    setIsOpen((isOpen) => !isOpen)
  }

  return (
    <div className={[
      'mb-10 rounded-dialogue bg-grey-1',
      isOpen ? 'max-h-[1200px]' : 'max-h-16 overflow-hidden',
      'transition-all duration-700 ease-in-out',
    ].join(' ')}
    >
      <button
        onClick={handleClick}
        className={[
          'w-full flex justify-between items-center px-5',
          'rounded-dialogue py-3 bg-grey-2',
          isOpen ? 'rounded-b-none' : null,
        ].join(' ')}
      >
        <div className="flex h-10 items-center">
          <h2 className="mb-0 mr-5">{title}</h2>
          <PostsList
            posts={posts}
            className={isOpen ? 'opacity-0' : 'opacity-1'}
            isSmall
          />
        </div>
        <div
          className={[
            'transition-transform duration-100 transform origin-center',
            isOpen ? null : 'rotate-180',
          ].join(' ')}
        >
          <ArrowIcon
            className="w-3 h-3"
            direction="up"
          />
        </div>
      </button>
      <div className="p-5">
        {isLoading ? (
          <Spinner width={25} />
        ) : (
          <PostsList
            posts={posts}
            className={isOpen ? 'opacity-1' : 'opacity-0'}
          />
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
