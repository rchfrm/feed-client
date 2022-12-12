import React from 'react'
import PropTypes from 'prop-types'
import { gsap, Power2 } from 'gsap'
import useOnResize from '@/landing/hooks/useOnResize'
import PostsFilter from '@/app/PostsFilter'
import PostsSorter from '@/app/PostsSorter'
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
  sortBy,
  setSortBy,
  isLoading,
  isLoadingMore,
  setIsLoadingMore,
  hasLoadedAll,
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const shouldShowPostsAmount = status === 'active' || status === 'rejected'

  const { width } = useOnResize()
  const containerRef = React.useRef(null)
  const contentRef = React.useRef(null)

  const toggle = () => {
    setIsOpen((isOpen) => ! isOpen)
  }

  const animate = React.useCallback((isOpen) => {
    if (containerRef.current) {
      const ease = Power2.easeInOut
      const duration = 0.1
      const minHeight = '73px'
      const maxHeight = isOpen ? `${contentRef.current.clientHeight + 100}px` : minHeight

      gsap.to(containerRef.current, { maxHeight, ease, duration })
    }
  }, [])

  React.useEffect(() => {
    animate(isOpen)
  }, [isOpen, animate, posts, width])

  return (
    <div
      className={[
        'mb-5 rounded-dialogue border border-solid',
        'transition-all duration-700 ease-in-out',
        'overflow-hidden',
        className,
      ].join(' ')}
      ref={containerRef}
    >
      <button
        onClick={toggle}
        className={[
          'w-full flex justify-between items-center p-5',
          isOpen ? 'rounded-b-none' : null,
        ].join(' ')}
      >
        <h2 className="mb-0 mr-5">{shouldShowPostsAmount ? posts.length : null} {postsConfig[status].name}</h2>
        {isOpen ? <CollapseIcon /> : <ExpandIcon />}
      </button>
      <div
        className={[
          'mb-5 px-5',
          'transition ease-in-out delay-200 transition-opacity',
          isOpen ? 'opacity-1' : 'opacity-0',
        ].join(' ')}
        ref={contentRef}
      >
        <div className="flex justify-between mb-5 text-xs">
          <PostsFilter
            filterBy={filterBy}
            setFilterBy={setFilterBy}
          />
          <PostsSorter
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>
        {isLoading ? (
          <div className="h-16 w-full flex items-center">
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
  filterBy: PropTypes.object.isRequired,
  setFilterBy: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired,
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
