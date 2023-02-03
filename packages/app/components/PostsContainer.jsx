import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { gsap, Power2 } from 'gsap'
import useOnResize from '@/landing/hooks/useOnResize'
import PostsFilter from '@/app/PostsFilter'
import PostsSorter from '@/app/PostsSorter'
import PostsList from '@/app/PostsList'
import PostsLoadMore from '@/app/PostsLoadMore'
import Spinner from '@/elements/Spinner'
import MarkdownText from '@/elements/MarkdownText'
import Button from '@/elements/Button'
import ExpandIcon from '@/icons/ExpandIcon'
import CollapseIcon from '@/icons/CollapseIcon'
import ArrowIcon from '@/icons/ArrowIcon'
import { postsConfig } from '@/app/helpers/postsHelpers'
import * as ROUTES from '@/app/constants/routes'

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
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(status === 'active')
  const [isPostActionsOpen, setIsPostActionsOpen] = React.useState(false)
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
      const minHeight = '73px'
      const contentHeight = contentRef.current.clientHeight + 100
      const duration = contentHeight * 0.001
      const maxHeight = isOpen ? `${contentHeight}px` : minHeight

      gsap.to(containerRef.current, { maxHeight, ease, duration })
    }
  }, [])

  const goToControlsPage = () => {
    Router.push({
      pathname: ROUTES.CONTROLS_OBJECTIVE,
    })
  }

  React.useEffect(() => {
    animate(isOpen)
  }, [isOpen, animate, posts, width])

  return (
    <div
      className={[
        'mb-5 rounded-dialogue border border-solid',
        ! isPostActionsOpen ? 'overflow-hidden' : null,
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
        {status === 'active' && isSpendingPaused ? (
          <>
            <MarkdownText
              className="text-sm w-1/3"
              markdown="Your campaigns are paused. Set a budget from the controls page to start running ads."
            />
            <Button
              color="yellow"
              size="medium"
              onClick={goToControlsPage}
              className=""
              trackComponentName="GetStartedDailyBudget"
            >
              Start Campaign
              <ArrowIcon
                className="w-5 h-auto ml-1"
                direction="right"
              />
            </Button>
          </>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between mb-5 text-xs">
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
                setIsPostActionsOpen={setIsPostActionsOpen}
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
          </>
        )}
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
  className: PropTypes.string,
}

PostsContainer.defaultProps = {
  isSpendingPaused: false,
  className: null,
}

export default PostsContainer
