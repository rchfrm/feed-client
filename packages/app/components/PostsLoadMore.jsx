import React from 'react'
import PropTypes from 'prop-types'
import Button from '@/elements/Button'
import Spinner from '@/elements/Spinner'
import brandColors from '@/constants/brandColors'

const PostsLoadMore = ({
  posts,
  isLoading,
  isLoadingMore,
  setIsLoadingMore,
  hasLoadedAll,
}) => {
  const shouldShowButton = posts.length > 0 && ! hasLoadedAll && ! isLoading

  const handleClick = () => {
    setIsLoadingMore(true)
  }

  return (
    <div>
      {shouldShowButton && (
        <Button
          size="small"
          version="secondary"
          onClick={handleClick}
        >
          {isLoadingMore ? <Spinner width={14} fill={brandColors.black} /> : 'Load more'}
        </Button>
      )}
    </div>
  )
}

PostsLoadMore.propTypes = {
  posts: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoadingMore: PropTypes.bool.isRequired,
  setIsLoadingMore: PropTypes.func.isRequired,
  hasLoadedAll: PropTypes.bool.isRequired,
}

export default PostsLoadMore
