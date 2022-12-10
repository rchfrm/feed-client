import React from 'react'
import PropTypes from 'prop-types'
import Spinner from '@/elements/Spinner'
import brandColors from '@/constants/brandColors'

const PostsLoadMore = ({
  posts,
  isLoading,
  isLoadingMore,
  setIsLoadingMore,
  hasLoadedAll,
}) => {
  const shouldShowButton = posts.length > 0 && !hasLoadedAll && !isLoading

  const handleClick = () => {
    setIsLoadingMore(true)
  }

  return (
    <div>
      {shouldShowButton && (
        <button
          onClick={handleClick}
          className="w-24 h-8 py-2 px-4 rounded-dialogue border border-solid border-black bg-white text-xs"
        >
          {isLoadingMore ? <Spinner width={14} fill={brandColors.textColor} /> : 'Load more'}
        </button>
      )}
    </div>
  )
}

PostsLoadMore.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isLoadingMore: PropTypes.bool.isRequired,
  setIsLoadingMore: PropTypes.func.isRequired,
  hasLoadedAll: PropTypes.bool.isRequired,
}

export default PostsLoadMore
