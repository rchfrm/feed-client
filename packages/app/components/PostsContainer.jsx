import React from 'react'
import PropTypes from 'prop-types'
import { gsap, Power2 } from 'gsap'
import useOnResize from '@/landing/hooks/useOnResize'
import useControlsStore from '@/app/stores/controlsStore'
import PostsContainerButton from '@/app/PostsContainerButton'
import PostsContainerSpendingPaused from '@/app/PostsContainerSpendingPaused'
import PostsFilter from '@/app/PostsFilter'
import PostsSorter from '@/app/PostsSorter'
import PostsList from '@/app/PostsList'
import PostsLoadMore from '@/app/PostsLoadMore'
import Spinner from '@/elements/Spinner'

const getControlsStoreState = (state) => ({
  isControlsLoading: state.isControlsLoading,
})

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
  isSpendingPaused,
  setStatusToRefresh,
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(status === 'active')
  const [isPostActionsOpen, setIsPostActionsOpen] = React.useState(false)
  const { isControlsLoading } = useControlsStore(getControlsStoreState)
  const hidePosts = status === 'active' && isSpendingPaused

  const { width } = useOnResize()
  const containerRef = React.useRef(null)
  const contentRef = React.useRef(null)

  const animate = React.useCallback((isOpen) => {
    if (containerRef.current) {
      const ease = Power2.easeInOut
      const minHeight = '73px'
      const contentHeight = contentRef.current.clientHeight + 100
      const duration = contentHeight * 0.001
      const maxHeight = isOpen ? `${contentHeight}px` : minHeight

      gsap.to(containerRef.current, { maxHeight, ease, duration })
    }
  }, [])

  React.useEffect(() => {
    animate(isOpen)
  }, [isOpen, animate, posts, width, isControlsLoading])

  return (
    <div
      className={[
        'mb-5 rounded-dialogue border border-solid',
        ! isPostActionsOpen ? 'overflow-hidden' : null,
        className,
      ].join(' ')}
      ref={containerRef}
    >
      <PostsContainerButton
        status={status}
        posts={posts}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isSpendingPaused={isSpendingPaused}
      />
      <div
        className={[
          'mb-5 px-5',
          'transition ease-in-out delay-200 transition-opacity',
          isOpen ? 'opacity-1' : 'opacity-0',
        ].join(' ')}
        ref={contentRef}
      >
        {isLoading || isControlsLoading ? (
          <div className="h-16 w-full">
            <Spinner width={30} />
          </div>
        ) : (
          hidePosts ? (
            <PostsContainerSpendingPaused />
          ) : (
            <>
              <div className="flex flex-col md:flex-row justify-between mb-5 text-xs">
                <PostsFilter
                  filterBy={filterBy}
                  setFilterBy={setFilterBy}
                />
                {status !== 'pending' && (
                  <PostsSorter
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                  />
                )}
              </div>
              <PostsList
                posts={posts}
                status={status}
                setPosts={setPosts}
                filterBy={filterBy}
                sortBy={sortBy}
                setIsPostActionsOpen={setIsPostActionsOpen}
                isSpendingPaused={isSpendingPaused}
                setStatusToRefresh={setStatusToRefresh}
                className="mb-5"
              />
            </>
          )
        )}
        <PostsLoadMore
          posts={posts}
          isLoading={isLoading}
          isLoadingMore={isLoadingMore}
          setIsLoadingMore={setIsLoadingMore}
          hasLoadedAll={hasLoadedAll}
          postsHidden={hidePosts}
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
  isSpendingPaused: PropTypes.bool,
  setStatusToRefresh: PropTypes.func.isRequired,
  className: PropTypes.string,
}

PostsContainer.defaultProps = {
  isSpendingPaused: false,
  className: null,
}

export default PostsContainer
