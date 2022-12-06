import React from 'react'
import PropTypes from 'prop-types'
import Button from '@/elements/Button'
import brandColors from '@/constants/brandColors'
// import ChevronIcon from '@/icons/ChevronIcon'

const PostsPagination = ({
  isLoading,
  isLoadingMore,
  setIsLoadingMore,
  hasLoadedAll,
}) => {
  const handleClick = () => {
    setIsLoadingMore(true)
  }

  return (
    <div className="flex justify-center items-center">
      {/* <button
        onClick={handleClick}
      >
        <ChevronIcon direction="left" className="h-3 mr-1" />
      </button>
      <div className="text-xs">Showing <span className="font-bold">5</span> of 10</div>
      {!hasLoadedAll && (
        <button
          onClick={handleClick}
        >
          <ChevronIcon className="h-3 ml-1" />
        </button>
      )} */}
      {!hasLoadedAll && !isLoading && (
        <Button
          version="text"
          onClick={handleClick}
          loading={isLoadingMore}
          spinnerFill={brandColors.green}
          className="h-auto mb-0"
        >
          Load more
        </Button>
      )}
    </div>
  )
}

PostsPagination.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isLoadingMore: PropTypes.bool.isRequired,
  setIsLoadingMore: PropTypes.func.isRequired,
  hasLoadedAll: PropTypes.bool.isRequired,
}

export default PostsPagination
