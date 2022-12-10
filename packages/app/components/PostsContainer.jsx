import React from 'react'
import PropTypes from 'prop-types'
import PostsFilter from '@/app/PostsFilter'
import PostsList from '@/app/PostsList'
import PostsLoadMore from '@/app/PostsLoadMore'
import Spinner from '@/elements/Spinner'
import ExpandIcon from '@/icons/ExpandIcon'
import CollapseIcon from '@/icons/CollapseIcon'
import { postsConfig } from '@/app/helpers/postsHelpers'

const PostsContainer = ({
  status,
  posts,
  setPosts,
  filterBy,
  setFilterBy,
  isLoading,
  isLoadingMore,
  setIsLoadingMore,
  hasLoadedAll,
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(true)
  const shouldShowPostsAmount = status === 'active' || status === 'rejected'

  const handleClick = () => {
    setIsOpen((isOpen) => !isOpen)
  }

  return (
    <div className={[
      'mb-5 rounded-dialogue border border-solid',
      'transition-all duration-700 ease-in-out',
      isOpen ? 'max-h-[1200px]' : 'max-h-[73px] overflow-hidden',
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
        <h2 className="mb-0 mr-5">{shouldShowPostsAmount ? posts.length : null} {postsConfig[status].name}</h2>
        {isOpen ? <CollapseIcon /> : <ExpandIcon />}
      </button>
      <div className={[
        'mb-5 px-5',
        'transition ease-in-out delay-200 transition-opacity',
        isOpen ? 'opacity-1' : 'opacity-0',
      ].join(' ')}
      >
        <PostsFilter
          filterBy={filterBy}
          setFilterBy={setFilterBy}
        />
        {isLoading ? (
          <div className="h-32 w-full flex items-center">
            <Spinner width={30} />
          </div>
        ) : (
          <PostsList
            posts={posts}
            status={status}
            setPosts={setPosts}
            filterBy={filterBy}
            className="mb-5"
          />
        )}
        <PostsLoadMore
          posts={posts}
          isLoading={isLoading}
          isLoadingMore={isLoadingMore}
          setIsLoadingMore={setIsLoadingMore}
          hasLoadedAll={hasLoadedAll}
        />
      </div>
    </div>
  )
}

PostsContainer.propTypes = {
  status: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  setPosts: PropTypes.func.isRequired,
  setFilterBy: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoadingMore: PropTypes.bool.isRequired,
  setIsLoadingMore: PropTypes.func.isRequired,
  hasLoadedAll: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

PostsContainer.defaultProps = {
  className: null,
}

export default PostsContainer
