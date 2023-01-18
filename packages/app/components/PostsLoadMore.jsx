import React from 'react'
import PropTypes from 'prop-types'
import ButtonNew from '@/elements/ButtonNew'
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
        <ButtonNew
          size="small"
          version="secondary"
          onClick={handleClick}
        >
          {isLoadingMore ? <Spinner width={14} fill={brandColors.black} /> : 'Load more'}
        </ButtonNew>
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
