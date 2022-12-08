import React from 'react'
import PropTypes from 'prop-types'
import PostsList from '@/app/PostsList'
import PostsLoadMore from '@/app/PostsLoadMore'
import Spinner from '@/elements/Spinner'
import ExpandIcon from '@/icons/ExpandIcon'
import CollapseIcon from '@/icons/CollapseIcon'
import { postsSections } from '@/app/helpers/postsHelpers'

const PostsLoader = ({
  section,
  posts,
  action,
  isLoading,
  isLoadingMore,
  setIsLoadingMore,
  hasLoadedAll,
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const shouldShowPostsAmount = section === 'active' || section === 'rejected'

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
        <h2 className="mb-0 mr-5">{shouldShowPostsAmount ? posts.length : null} {postsSections[section].title}</h2>
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
            section={section}
            action={action}
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

PostsLoader.propTypes = {
  section: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
}

export default PostsLoader
